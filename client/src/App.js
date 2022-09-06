import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing, Register, Error, ProtectedRoute } from './page';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    AddJob,
    AllJobs,
    Profile,
    SharedLayout,
    Stats
} from './page/dashboard';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <ProtectedRoute>
                        <SharedLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Stats />} />
                    <Route path='all-jobs' element={<AllJobs />} />
                    <Route path='add-job' element={<AddJob />} />
                    <Route path='profile' element={<Profile />} />
                </Route>
                <Route path='register' element={<Register />} />
                <Route path='landing' element={<Landing />} />
                <Route path='*' element={<Error />} />
            </Routes>
            <ToastContainer
                position='top-right'
                theme='dark'
                autoClose={2000}
                transition={Flip}
                hideProgressBar
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </BrowserRouter>
    );
}

export default App;
