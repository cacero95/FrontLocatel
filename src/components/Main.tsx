import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { UseDialog } from "./hooks/UseDialog";
import { ToolBar } from "../templates/ToolBar";
import { Grid } from "@mui/material";
import { Navigation } from "../Navigation";
import { LinearLoading } from "../templates/LinearLoading";

export const Main = () => {

    const { userState, loading } = useContext( UserContext );

    console.log( loading, userState );

    return (
        <div>
            <UseDialog
				title = ""
				component = { <LinearLoading /> }
				open = { loading }
				handleClose = { () => '' }
			/>
			<ToolBar/>
			<Grid
				container
				direction = "column"
				alignItems = "center"
				justifyContent = "center"
				sx = {{ backgroundColor:'#f5f5f5' }}
			>
				<Navigation />
			</Grid>
        </div>
    )
}
