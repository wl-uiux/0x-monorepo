import * as chai from 'chai';
import 'mocha';
import * as R from 'ramda';

import { CryptoCompareOHLCVRecord } from '../../../src/data_sources/ohlcv_external/crypto_compare';
import { OHLCVExternal } from '../../../src/entities';
import { OHLCVMetadata, parseRecords } from '../../../src/parsers/ohlcv_external/crypto_compare';
import { chaiSetup } from '../../utils/chai_setup';

chaiSetup.configure();
const expect = chai.expect;

// tslint:disable:custom-no-magic-numbers
describe('ohlcv_external parser (Crypto Compare)', () => {
    describe('parseRecords', () => {
        const record: CryptoCompareOHLCVRecord = {
            time: 200,
            close: 100,
            high: 101,
            low: 99,
            open: 98,
            volumefrom: 1234,
            volumeto: 4321,
        };

        const metadata: OHLCVMetadata = {
            fromSymbol: 'ETH',
            toSymbol: 'ZRX',
            exchange: 'CCCAGG',
            source: 'CryptoCompare',
            observedTimestamp: new Date().getTime(),
            interval: 100000,
        };

        const entity = new OHLCVExternal();
        entity.exchange = metadata.exchange;
        entity.fromSymbol = metadata.fromSymbol;
        entity.toSymbol = metadata.toSymbol;
        entity.startTime = 100000;
        entity.endTime = 200000;
        entity.open = record.open;
        entity.close = record.close;
        entity.low = record.low;
        entity.high = record.high;
        entity.volumeFrom = record.volumefrom;
        entity.volumeTo = record.volumeto;
        entity.source = metadata.source;
        entity.observedTimestamp = metadata.observedTimestamp;

        it('converts Crypto Compare OHLCV records to OHLCVExternal entity', () => {
            const input = [record, R.merge(record, { time: 300 }), R.merge(record, { time: 400 })];
            const expected = [
                entity,
                R.merge(entity, { startTime: 200000, endTime: 300000 }),
                R.merge(entity, { startTime: 300000, endTime: 400000 }),
            ];

            const actual = parseRecords(input, metadata);
            expect(actual).deep.equal(expected);
        });
    });
});
