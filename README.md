Full-stack SPA. Платформа для хранения статей, где пользователи могут просматривать, а также оставлять отзывы и комментарии к статьям

Frontend: TS, React, MUI, react-hook-form, Redux Toolkit, axios, rr6
Backend: Node, MongoDB, express
Вместо SCSS использовал styled-components

Запуск сервера npm run serve/ запуск клиента npm run dev

Масштабируемость:
1. Отдельный файл config.json - возможность менять apiEndPoint в одном месте
2. Универсальный http.service - возможность легко менять сервер
3. Применил архитектуру Feature-Sliced Design
4. Приложение разбито на множество компонентов

![image](https://github.com/Salimov-dev/Amiran-media/assets/108460956/011d54cd-1a9b-418b-a27d-53373807864c)

![image](https://github.com/Salimov-dev/Amiran-media/assets/108460956/b4597615-f008-40f5-871b-97e275f5187f)





