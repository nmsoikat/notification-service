export const RabbitMQEvents = {
    EMAIL: {
        SEND: 'notification.email.send',
    },

    SMS: {
        SEND: 'notification.sms.send',
    },

    PUSH: {
        SEND: 'notification.push.send',
    },

    POPUP: {
        SEND: 'notification.popup.send',
    },

    NOTIFICATION: {
        CREATED: 'notification.created',
        SCHEDULED: 'notification.scheduled',
        FAILED: 'notification.failed',
        SENT: 'notification.sent',
    },
} as const;