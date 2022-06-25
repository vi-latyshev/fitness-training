import { AuthLayout } from 'views/home';

import {
    Link,
    Input,
    Button,
    Checkbox,
} from 'components/controls';

import type { NextPageWithLayout } from 'views/home';

const Register: NextPageWithLayout = () => (
    <form className="w-full space-y-8">
        <div className="flex flex-col w-full space-y-4">
            <Input full placeholder="Имя пользователя" />
            <Input full placeholder="Пароль" />
            <Checkbox className="self-end" label="Стать тренером" />
            <Button full type="button">
                Зарегистрироваться
            </Button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-end text-sm text-center w-full">
            <p className="pb-2 sm:mt-0 sm:pb-0 sm:pr-4">Есть аккаунт?</p>
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
