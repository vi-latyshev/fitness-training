import { UserRole } from 'lib/models/user';
import { TraineeBaseLayout } from 'views/trainee';
import Card from 'components/Card';
import { Button } from 'components/controls';

import type { NextPageWithLayout } from 'views/home';
import Table from 'components/Table';

/**
 * @TODO Обзор: rол-во тренировок | Не сделано | Завершенные
 * @TODO Список тренировок (пока что без пагинации)
 */
export const TraineeWorkout: NextPageWithLayout = () => (
    <Card.Container>
        <Card.Card>
            <Card.Title>Список тренировок</Card.Title>
            <Table.Container>
                <Table.Head>
                    <Table.Row border={false}>
                        <Table.Cell colSpan={2}>
                            <div className="flex items-center space-x-4 ">
                                <Button variant="soft" rounded hover={false}>Все</Button>
                                <Button variant="text" rounded>Не сделано</Button>
                                <Button variant="text" rounded>Завершенные</Button>
                            </div>
                        </Table.Cell>
                        <Table.Cell align="right">
                            <Button>
                                Запросить
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            Бег
                        </Table.Cell>
                        <Table.Cell>
                            <Button variant="soft">15.07.2022</Button>
                        </Table.Cell>
                        <Table.Cell className="w-full" align="right">
                            <Button variant="text">...</Button>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            Отжимания
                        </Table.Cell>
                        <Table.Cell>
                            <Button variant="soft" color="error">10.06.2022</Button>
                        </Table.Cell>
                        <Table.Cell align="right">
                            <Button variant="text">...</Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Container>
        </Card.Card>
        <Card.Card>
            <Card.Title>Успеваемость</Card.Title>
        </Card.Card>
        <Card.Card>
            <Card.Title>Успеваемость</Card.Title>
        </Card.Card>
        <Card.Card>
            <Card.Title>Успеваемость</Card.Title>
        </Card.Card>
        <Card.Card>
            <Card.Title>Успеваемость</Card.Title>
        </Card.Card>
    </Card.Container>
);

TraineeWorkout.layoutProps = {
    meta: {
        title: 'Тренировки',
    },
    Layout: TraineeBaseLayout,
    auth: {
        needRole: UserRole.TRAINEE,
    },
};

export default TraineeWorkout;
