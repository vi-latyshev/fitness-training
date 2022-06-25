import { AuthLayout } from 'views/home';

import { Button, Input, Link } from 'components/controls';

import type { NextPageWithLayout } from 'views/home';

const Login: NextPageWithLayout = () => (
    <form className="w-full space-y-6">
        <div className="w-full space-y-2">
            <Input full placeholder="Ваше имя пользователя" />
            <Input full placeholder="Ваш пароль" />
        </div>
        <Button full type="button" className="mt-5">
            Войти
        </Button>
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-center w-full">
            <p className="pb-2 sm:mt-0 sm:pb-0 sm:pr-12">Еще нет аккаунта?</p>
            <Link href="/register" variant="soft">Register</Link>
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
