import { Box } from "@mui/material"
import food from "../recycling.jpg"

export default function Home() {
    return (
        <Box display={"flex"} flexDirection="column" alignItems={"center"}>
        <div>
        <h1>Welcome to our food waste app!</h1>
        </div>
        <div>
        <img src={food} alt="" style={{width: '400px', height: '400px'}}/>        
        </div>
        </Box>
    )
}