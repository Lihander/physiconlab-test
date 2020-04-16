<template>
    <div class="showcase">
        <div class="title">{{ title }}</div>
        <div class="filters">
            <select v-model="selectedSubject">
                <option value="">Все предметы</option>
                <option v-for="(subject, index) in subjects" :key="index" :value="subject">{{ subject }}</option>
            </select>
            <select v-model="selectedGenres">
                <option value="">Все жанры</option>
                <option v-for="(genre, index) in genres" :key="index" :value="genre">{{ genre }}</option>
            </select>
            <select v-model="selectedGrades">
                <option value="">Все классы</option>
                <option v-for="(grade, index) in grades" :key="index" :value="grade">{{ grade }}</option>
            </select>
            <div class="search-line">
                <input v-model="search" :placeholder="searchPlaceholder">
                <font-awesome-icon :icon="searchIcon" class="search-icon" />
            </div>
        </div>
        <div class="courses-wrapper">
            <span v-if="isFiltered">Результаты поиска:</span>
            <div class="courses">
                <CourseCard :course="course" v-for="course in courses" :key="course.courseId" />
            </div>
        </div>
    </div>
</template>

<script>
    import CourseCard from "../components/CourseCard";
    export default {
        name: "Showcase",
        components: {CourseCard},
        data() {
            return {
                title: "Витрина",
                selectedSubject: "",
                selectedGenres: "",
                selectedGrades: "",
                search: "",
                searchPlaceholder: "Поиск",
                searchIcon: ["fas", "search"]
            }
        },
        computed: {
            isFiltered() {
                return Boolean(this.selectedSubject
                    || this.selectedGenres
                    || this.selectedGrades
                    || this.search
                )
            },
            courses() {
                let courses = this.$store.getters.getCourses
                if (this.isFiltered) {
                    if (this.selectedSubject) {
                        courses = courses.filter(course => {
                            return course.subject === this.selectedSubject
                        })
                    }
                    if (this.selectedGenres) {
                        courses = courses.filter(course => {
                            return course.genre === this.selectedGenres
                        })
                    }
                    if (this.selectedGrades) {
                        courses = courses.filter(course => {
                            return course.grade.split(";").includes(this.selectedGrades)
                        })
                    }
                    if (this.search) {
                        courses = courses.filter(course => {
                            let description = ""

                            if (course.subject) {
                                description += course.subject
                            }

                            if (course.genres) {
                                description += " " + course.genres
                            }

                            if (course.description) {
                                description += " " + course.description
                            }

                            return description.toString().toLowerCase().includes(this.search.toString().toLowerCase())
                        })
                    }
                }
                return courses
            },
            subjects() {
                const subjects = []
                const courses = this.$store.getters.getCourses
                courses.forEach(course => {
                    if (!subjects.includes(course.subject)) {
                        subjects.push(course.subject)
                    }
                })
                subjects.sort()
                return subjects
            },
            genres() {
                const genres = []
                const courses = this.$store.getters.getCourses
                courses.forEach(course => {
                    if (!genres.includes(course.genre)) {
                        genres.push(course.genre)
                    }
                })
                genres.sort()
                return genres
            },
            grades() {
                let grades = []
                const courses = this.$store.getters.getCourses
                courses.forEach(course => {
                    grades = Array.from(new Set(grades.concat(course.grade.split(";"))))
                })
                grades.sort((a, b) => {
                    return a - b;
                })
                return grades
            }
        },
        created() {
            this.$store.dispatch("setCourses")
        }
    }
</script>

<style lang="scss">
    .title {
        text-align: center;
        font-size: 36px;
        font-weight: 300;
        color: $mainFontColor;
    }
    .filters {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: row;
        margin-top: 30px;
        padding: 0 15px;
        @media screen and (max-width: $tableWidth) {
            width: 100%;
            flex-direction: column;
        }
        select, input {
            height: 2.3em;
            @media screen and (max-width: $tableWidth) {
                margin: 10px 0;
            }
        }
        select {
            width: 100%;
            margin-right: 20px;
        }
        .search-line {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            input {
                width: 90%;
            }
            .search-icon {
                width: 10%;
                padding-top: 5px;
                padding-bottom: 5px;
                margin-left: 5px;
                color: $neutral-regular;
                font-size: 32px;
            }
        }
    }
    .courses-wrapper {
        margin: 50px 0 20px 0;
        span {
            display: block;
            width: 100%;
            text-align: center;
            font-size: 24px;
            font-weight: 300;
            margin-bottom: 20px;
        }
        .courses {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
        }
    }

</style>