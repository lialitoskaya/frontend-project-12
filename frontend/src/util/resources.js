export const ru = {
  translation: {
    toast: {
      channelCreated: 'Канал создан',
      channelRemoved: 'Канал удален',
      channelRenamed: 'Канал переименован',
    },
    axiosError: 'Ошибка соединения',
    btnSubmit: 'Отправить',
    mainPage: {
      header: 'Hexlet Chat',
      logout: 'Выйти',
    },
    logInForm: {
      header: 'Войти',
      login: 'Ваш ник',
      password: 'Пароль',
      btnSubmit: 'Войти',
      footer: {
        text: 'Нет аккаунта?',
        href: 'Регистрация',
      },
      error: 'Неверные имя пользователя или пароль',
    },
    signUpForm: {
      header: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      btnSubmit: 'Зарегистрироваться',
      errors: {
        required: 'Обязательное поле',
        confirmPassword: 'Пароли должны совпадать',
        passwordLength: 'Не менее 6 символов',
        usernameLength: 'От 3 до 20 символов',
        notUniqUser: 'Такой пользователь уже существует',
      },
    },
    chatPage: {
      channels: {
        header: 'Каналы',
        add: 'Добавить канал',
        rename: 'Переименовать канал',
        name: 'Название',
        removeChannel: {
          header: 'Удалить канал',
          body: 'Уверены?',
        },
        btnSubmit: 'Отправить',
        btnCancel: 'Отменить',
        btnRemove: 'Удалить',
        btnRename: 'Переименовать',
        errors: {
          nameLength: 'От 3 до 20 символов',
          notUniqName: 'Должно быть уникальным',
          required: 'Обязательное поле',
        },
      },
      messages: {
        messagesCount_one: '{{count}} сообщение',
        messagesCount_many: '{{count}} сообщений',
        messagesCount_few: '{{count}} сообщения',
        input: 'Введите сообщение...',
      },
    },

  },
};
