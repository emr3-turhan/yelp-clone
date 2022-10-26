import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import { RestaurantContextProvider } from './context/RestaurantContext';

const App = () => {
    return (
        <RestaurantContextProvider>
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />
                        <Route exact path="/restaurants/:id" element={<RestaurantdetailPage />} />
                    </Switch>
                </Router>
            </div>
        </RestaurantContextProvider>
    );
}

export default App;