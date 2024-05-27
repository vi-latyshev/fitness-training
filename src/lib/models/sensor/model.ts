import type { Tagged } from 'type-fest';
import type { EngineId } from '../engine/model';

export type SensorId = Tagged<string, 'SensorId'>;

export type Sensor = {
    id: SensorId;
    engineId: EngineId;
    dumpDate: number;
    temperature: number;
    vibration: number;
    electromagneticField: number;
};
