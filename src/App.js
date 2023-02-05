import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layouts/Layout.js';
import MyTasks from './components/pages/MyTasks.js';
import User from './components/pages/User.js';
import SignIn from './components/pages/SignIn.js';
import ContactUs from './components/pages/ContactUs.js';

import PageNotFound from './components/pages/404.js';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Layout >
        <Routes>
          <Route exact path='/' element={<MyTasks />} />
          <Route path='/user' element={<User />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;