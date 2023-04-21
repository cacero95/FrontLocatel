import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from '@emotion/react'
import { Main } from "./components/Main"
import { theme } from "./tools/ThemeConfig";

export const App = () => (
	<UserProvider>
		<ThemeProvider theme = { theme }>
			<Main />
		</ThemeProvider>
	</UserProvider>

);