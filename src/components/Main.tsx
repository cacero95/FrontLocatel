import { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { UseDialog } from "./hooks/UseDialog";
import { ToolBar } from "../templates/ToolBar";
import { Grid } from "@mui/material";
import { Navigation } from "../Navigation";
import { LinearLoading } from "../templates/LinearLoading";
import MssFooter from "../templates/MssFooter";

export const Main = () => {

    const { loading } = useContext( UserContext );
	const footerRef = useRef<any>();

    return (
        <div id = "MainContainer">
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
			<div id = "footerMss" ref = { footerRef }>
				<MssFooter
					container = { footerRef.current }
					id = "footerMssPopper"
				/>	
			</div>
        </div>
    )
}
