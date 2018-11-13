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
    const events = {};

    function call(contexts) {
        for (let context of contexts) {
            context.function.apply(context.context);
        }
    }

    return {

        on: function (event, context, handler) {
            if (events[event]) {
                events[event].push({ function: handler, context });
            } else {
                events[event] = [{ function: handler, context: context }];
            }

            return this;
        },

        off: function (event, context) {
            Object
                .keys(events)
                .filter(item => {
                    return item === event || item.startsWith(event + '.');
                })
                .forEach(key => {
                    events[key] = events[key]
                        .filter(item => item.context !== context);
                });

            return this;
        },

        emit: function (event) {
            while (event !== '') {
                const contexts = events[event];
                if (contexts) {
                    call(contexts);
                }
                event = event.substring(0, event.lastIndexOf('.'));
            }

            return this;
        },

        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);

            return this;
        },

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
