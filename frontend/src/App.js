import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ItemsProvider from './Context/ItemsProvider';
import Alert from './Components/Alert';
import AlertProvider from './Context/AlertProvider';

function App() {

	return (
		<Router>
			<AlertProvider>
				<ItemsProvider>
					{ <Alert /> }
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</ItemsProvider>
			</AlertProvider>
		</Router>
	);
}

export default App;
