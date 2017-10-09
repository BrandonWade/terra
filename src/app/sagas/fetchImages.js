import { takeEvery, put } from 'redux-saga/effects';
import {
    fetchAction,
    errorAction,
    FETCH_IMAGES,
    FETCHING_IMAGES,
    FETCHED_IMAGES,
    SHOW_ERROR,
} from '../actions/index';

export default function* watchFetchImages() {
    yield takeEvery(FETCH_IMAGES, fetchImages);
}

function* fetchImages() {
    yield put(fetchAction(FETCHING_IMAGES));

    fetch('/images')
    .then(res => res.json())
    .then(data => {
        put(fetchAction(FETCHED_IMAGES));
    })
    .catch(err => {
        put(errorAction(SHOW_ERROR, err));
    });
}
