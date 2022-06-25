import { AuthLayout } from 'views/home';

import { Button, Input, Link } from 'components/controls';

import type { NextPageWithLayout } from 'views/home';

const Login: NextPageWithLayout = () => (
    <form className="w-full space-y-8">
        <div className="w-full space-y-4">
            <Input full placeholder="Ваше имя пользователя" />
            <Input full placeholder="Ваш пароль" />
            <Button full type="button">
                Войти
            </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-end text-sm text-center w-full">
            <p className="pb-2 sm:mt-0 sm:pb-0 sm:pr-4">Еще нет аккаунта?</p>
            <Link href="/register" variant="soft">Создать</Link>
        </div>
    </form>
);

Login.layoutProps = {
    meta: {
        title: 'Вход',
    },
    Layout: AuthLayout,
};

export default Login;
