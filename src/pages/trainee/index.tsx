import dayjs from 'dayjs';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline';

import { UserRole } from 'lib/models/user';

import { TraineeBaseLayout } from 'views/trainee';
import { WorkoutStatsSelf } from 'views/trainee/components';

import Card from 'components/Card';

import type { NextPageWithLayout } from 'views/base';

const percent = (start: number, current: number) => Math.round(((current - start) / start) * 100 * 100) / 100;

/**
 * @TODO Полный обзор пользователя
 */
const TraineeOverview: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1 2xl:grid-cols-4">
        <Card.Card className="col-span-1 2xl:col-span-3">
            <Card.Title>Показатели</Card.Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 auto-rows-max gap-6">
                <div className="space-y-1">
                    <div className="text-sm">Отжимания</div>
                    <div className="flex flex-row items-end font-bold text-xl space-x-1">
                        <div>{20} / {22}</div>
                        <div className="flex flex-row text-lg">
                            ({percent(20, 22)}%)
                        </div>
                        <ArrowSmUpIcon className="text-success-light h-8 w-8" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm">Приседания</div>
                    <div className="flex flex-row items-end font-bold text-xl space-x-1">
                        <div>{30} / {25}</div>
                        <div className="flex flex-row text-lg">
                            ({percent(30, 29)}%)
                        </div>
                        <ArrowSmDownIcon className="text-error-light h-8 w-8" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm">Прыжки в длину (м.)</div>
                    <div className="flex flex-row items-end font-bold text-xl space-x-1">
                        <div>{2.3} / {2.1}</div>
                        <div className="flex flex-row text-lg">
                            ({percent(2.3, 2.1)}%)
                        </div>
                        <ArrowSmDownIcon className="text-error-light h-8 w-8" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm">Подтягивания</div>
                    <div className="flex flex-row items-end font-bold text-xl space-x-1">
                        <div>{20} / {30}</div>
                        <div className="flex flex-row text-lg">
                            ({percent(20, 30)}%)
                        </div>
                        <ArrowSmUpIcon className="text-success-light h-8 w-8" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm">Пресс</div>
                    <div className="flex flex-row items-end font-bold text-xl space-x-1">
                        <div>{20} / {19}</div>
                        <div className="flex flex-row text-lg">
                            ({percent(20, 19)}%)
                        </div>
                        <ArrowSmUpIcon className="text-success-light h-8 w-8" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm">Челночный бег</div>
                    <div className="flex flex-row items-end font-bold text-xl space-x-1">
                        <div>{dayjs.duration(138025).format('m:ss,SSS')} / {dayjs.duration(120000).format('m:ss,SSS')}</div>
                        <div className="flex flex-row text-lg">
                            ({percent(138025, 120000)}%)
                        </div>
                        <ArrowSmUpIcon className="text-success-light h-8 w-8" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="text-sm">Кросс 1000м</div>
                    <div className="flex flex-row items-end font-bold text-xl space-x-1">
                        <div>{dayjs.duration(138025).format('m:ss,SSS')} / {dayjs.duration(148025).format('m:ss,SSS')}</div>
                        <div className="flex flex-row text-lg">
                            ({percent(138025, 148025)}%)
                        </div>
                        <ArrowSmDownIcon className="text-error-light h-8 w-8" />
                    </div>
                </div>
            </div>
        </Card.Card>
        <Card.Card>
            <Card.Title>Тренировки</Card.Title>
            <WorkoutStatsSelf />
        </Card.Card>
    </Card.Container>
);

TraineeOverview.layoutProps = {
    meta: {
        title: 'Обзор',
    },
    auth: {
        needRole: UserRole.TRAINEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineeOverview;
