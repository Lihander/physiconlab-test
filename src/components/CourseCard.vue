<template>
    <div class="course-card">
        <div class="figure">
            <img :src=img :alt=course.subject>
        </div>
        <div class="info">
            <p class="subject">{{ course.subject }}</p>
            <p class="grade">{{ grade }}</p>
            <p class="genre">{{ course.genre }}</p>
            <div class="meta-line">
                <p class="meta" >
                    <a :href=meta>Подробнее</a>
                </p>
                <font-awesome-icon :icon="icon" class="toggle-price" @click="showBonus = !showBonus" />
            </div>
            <p class="controls">
                <a :href="'#'">{{ price }}</a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CourseCard",
        props: {
            course: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                showBonus: false,
                bonusIcon: ["fas", "ruble-sign"],
                rublesIcon: ["fas", "coins"],
                imumkURL: "https://www.imumk.ru/"
            }
        },
        computed: {
            img() {
                return this.imumkURL + "/svc/coursecover/" + this.course.courseId
            },
            meta() {
                return this.imumkURL + "/offer/" + this.course.courseId
            },
            grade() {
                const gradeArr = this.course.grade.split(";")
                const gradeArrLength = gradeArr.length
                return gradeArrLength > 1 ? gradeArr[0] + "-" + gradeArr[gradeArrLength - 1] : gradeArr[0]
            },
            price() {
                return this.showBonus ? this.course.priceBonus + " бонусов" : this.course.price +" руб."
            },
            icon() {
                return this.showBonus ? this.bonusIcon : this.rublesIcon
            }
        }
    }
</script>

<style lang="scss">
    .course-card {
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        display: block;
        margin: 0 15px 55px;
        width: 170px;
        min-height: 260px;
        border: solid 1px $border-base;
        border-radius: 10px;
        background: $default-color;
        .figure {
            position: relative;
            overflow: hidden;
            height: 134px;
            background: #ddd;
        }
        .info {
            padding: 10px 16px;
            p {
                margin: .4em 0;
                padding-left: .5em;
                font-size: 14px;
                font-weight: normal;
            }
            a {
                color: $primary-color;
                text-decoration: none;
            }
            .subject {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .grade {
                margin-top: -.2em;
            }
            .genre {
                margin-top: -.4em;
                font-size: 11px;
            }
            .meta-line {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .meta {
                    margin-bottom: 0;
                    font-size: 12px;
                    font-weight: 600;
                    color: $primary-color;
                }
                .toggle-price {
                    cursor: pointer;
                    color: $secondary-color;
                }
            }
            .controls {
                padding: .4em .1em;
                border-radius: 6px;
                background: $primary-color;
                margin-bottom: 0;
                text-align: center;
                a {
                    color: $default-color;
                    font-size: 14px;
                }
                &:hover {
                    background: $secondary-color;
                }
                &:active {
                    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15) inset, 0 0 6px rgba(0, 0, 0, 0.2) inset;
                }
            }
        }
    }

</style>