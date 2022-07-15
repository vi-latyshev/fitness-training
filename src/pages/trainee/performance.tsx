import dayjs from 'dayjs';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/outline';

import { UserRole } from 'lib/models/user';

import { TraineeBaseLayout } from 'views/trainee';

import Card from 'components/Card';
import Table from 'components/Table';
import { Button, Input } from 'components/controls';

import type { NextPageWithLayout } from 'views/base';

const percent = (start: number, current: number) => Math.round(((current - start) / start) * 100 * 100) / 100;

const TraineePerformance: NextPageWithLayout = () => (
    <Card.Container className="grid-cols-1 lg:grid-cols-5">
        <Card.Card className="col-span-5 2xl:col-span-3">
            <Card.Title>Ввод текущих показателей</Card.Title>
            <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-max gap-6">
                <Input label="Отжимания" />
                <Input label="Приседания" />
                <Input label="Прыжки в длину" />
                <Input label="Подтягивания" />
                <Input label="Пресс" />
                <Input label="Челночный бег" />
                <Input label="Кросс 1000м" />
            </div>
            <Button className="self-start">
                Добавить
            </Button>
        </Card.Card>
        <Card.Card className="col-span-5 2xl:col-span-2">
            <div className="flex flex-col gap-6">
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
        <Card.Card className="col-span-5">
            <Card.Title>Список показателей</Card.Title>
            <Table.Container>
                <Table.Table>
                    <Table.Head>
                        <Table.Row border={false}>
                            <Table.Cell>
                                Отжимания
                            </Table.Cell>
                            <Table.Cell>
                                Приседания
                            </Table.Cell>
                            <Table.Cell>
                                Прыжки в длину
                            </Table.Cell>
                            <Table.Cell>
                                Подтягивания
                            </Table.Cell>
                            <Table.Cell>
                                Пресс
                            </Table.Cell>
                            <Table.Cell>
                                Челночный бег
                            </Table.Cell>
                            <Table.Cell>
                                Кросс 1000м
                            </Table.Cell>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                20
                            </Table.Cell>
                            <Table.Cell>
                                30
                            </Table.Cell>
                            <Table.Cell>
                                2.3
                            </Table.Cell>
                            <Table.Cell>
                                20
                            </Table.Cell>
                            <Table.Cell>
                                20
                            </Table.Cell>
                            <Table.Cell>
                                {dayjs.duration(138025).format('m:ss,SSS')}
                            </Table.Cell>
                            <Table.Cell>
                                {dayjs.duration(138025).format('m:ss,SSS')}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                22
                            </Table.Cell>
                            <Table.Cell>
                                25
                            </Table.Cell>
                            <Table.Cell>
                                2.1
                            </Table.Cell>
                            <Table.Cell>
                                30
                            </Table.Cell>
                            <Table.Cell>
                                19
                            </Table.Cell>
                            <Table.Cell>
                                {dayjs.duration(120000).format('m:ss,SSS')}
                            </Table.Cell>
                            <Table.Cell>
                                {dayjs.duration(148025).format('m:ss,SSS')}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Table>
            </Table.Container>
        </Card.Card>
    </Card.Container>
);

TraineePerformance.layoutProps = {
    meta: {
        title: 'Показатели',
    },
    auth: {
        needRole: UserRole.TRAINEE,
    },
    Layout: TraineeBaseLayout,
};

export default TraineePerformance;
