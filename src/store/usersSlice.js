import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from '../hooks/http.hook.js';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
    usersLoadingStatus: 'idle',
    userIsActive: ''
});

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const { request } = useHttp();
        return await request('http://localhost:3001/users');
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersCreated: (state, action) => {
            usersAdapter.addOne(state, action.payload);
        },

        usersDeleted: (state, action) => {
            usersAdapter.removeOne(state, action.payload);
        },
        setUserIsActive: (state, action) => {
            state.userIsActive = action.payload;
        },
        userUpdate: (state, action) => {
            usersAdapter.updateOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.usersLoadingStatus = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.usersLoadingStatus = 'loaded';
            usersAdapter.setAll(state, action.payload);
        })
        .addCase(fetchUsers.rejected, (state) => {
            state.usersLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
    }
})

const { actions, reducer } = usersSlice;

const { selectAll } = usersAdapter.getSelectors(state => state.users);

export const usersSelector = createSelector(
    state => state.users,
    selectAll,
    (users) => {
        return Object.values(users.entities);
    }
);

export const {
    usersCreated,
    usersDeleted,
    userUpdate,
    setUserIsActive
} = actions;

export default reducer;