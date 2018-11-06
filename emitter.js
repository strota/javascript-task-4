'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    const dictionary = {};

    function call(contexts) {
        for (let context of contexts) {
            context.function.apply(context.context);
        }
    }

    function getNecessaryElements(event) {
        return Object.keys(dictionary).map((value) => {
            return value;
        })
            .filter(item => {
                return item === event || item.startsWith(event + '.');
            });
    }

    return {

        // /**
        //  * Подписаться на событие
        //  * @param {String} event
        //  * @param {Object} context
        //  * @param {Function} handler
        //  */
        on: function (event, context, handler) {
            if (dictionary[event]) {
                dictionary[event].push({ function: handler, context: context });
            } else {
                dictionary[event] = [{ function: handler, context: context }];
            }

            return this;
        },

        // /**
        //  * Отписаться от события
        //  * @param {String} event
        //  * @param {Object} context
        //  */
        off: function (event, context) {
            getNecessaryElements(event).forEach(value => {
                dictionary[value] = dictionary[value].map(valueTwo => {
                    return valueTwo;
                })
                    .filter(item => {
                        return item.context !== context;
                    });
                dictionary[value] = dictionary[value].filter(
                    person => person.context !== context);
            });

            return this;
        },

        // /**
        //  * Уведомить о событии
        //  * @param {String} event
        //  */
        emit: function (event) {
            while (event !== '') {
                const contexts = dictionary[event];
                if (contexts) {
                    call(contexts);
                }
                event = event.substring(0, event.lastIndexOf('.'));
            }

            return this;
        },

        // /**
        //  * Подписаться на событие с ограничением по количеству полученных уведомлений
        //  * @star
        //  * @param {String} event
        //  * @param {Object} context
        //  * @param {Function} handler
        //  * @param {Number} times – сколько раз получить уведомление
        //  */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);

            return this;
        },

        // /**
        //  * Подписаться на событие с ограничением по частоте получения уведомлений
        //  * @star
        //  * @param {String} event
        //  * @param {Object} context
        //  * @param {Function} handler
        //  * @param {Number} frequency – как часто уведомлять
        //  */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);

            return this;
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
