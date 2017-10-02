import watchFetchImages from './FetchImages';

export default function* rootSaga() {
    yield [
        watchFetchImages(),
    ];
}
