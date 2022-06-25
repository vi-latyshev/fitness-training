import { AuthLayout } from 'views/home';

import { Button, Input, Link } from 'components/controls';

import type { NextPageWithLayout } from 'views/home';

const Register: NextPageWithLayout = () => (
    <form className="w-full space-y-6">
        <div className="w-full space-y-2">
            <Input full placeholder="Имя пользователя" />
            <Input full placeholder="Пароль" />
        </div>
        <Button full type="button" className="mt-5">
            Зарегистрироваться
        </Button>
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-center w-full">
            <p className="pb-2 sm:mt-0 sm:pb-0 sm:pr-12">Есть аккаунт?</p>
            <Link href="/login" variant="soft">Войти</Link>
        </div>
    </form>
);

Register.layoutProps = {
    meta: {
        title: 'Регистрация',
    },
    Layout: AuthLayout,
};

export default Register;
