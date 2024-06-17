import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const refProgress = {
                    "fegs": "false",
                    "lis": "false",
                    "glm": "false",
                    "lip": "false",
                    "lma": "false",
                    "crs": "false"
                    }

export default function DetailedProgressBar(props) {
    if (props.progress) props.progress.forEach(instrProgress => {
        let {wstokenid, message, ...rest} = instrProgress;
        for (let [key, value] of Object.entries(rest)) { // always 1 execution for a object with single value.
            refProgress[`${key}`] = value;
        }
    });

    return (
    <Box>
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={props.progressPercentage} />
        </Box>
        <Paper>
            <Typography variant="body2" style={{margin: "1rem", padding: "1rem"}}>
                Subsetting CRS  : {(refProgress["crs"] === "true") ? "Complete" : "Progress"} <br/>
                Subsetting FEGS : {(refProgress["fegs"] === "true") ? "Complete" : "Progress"} <br/>
                Subsetting GLM  : {(refProgress["glm"] === "true") ? "Complete" : "Progress"} <br/>
                Subsetting LIS  : {(refProgress["lis"] === "true") ? "Complete" : "Progress"} <br/>
                Subsetting LIP  : {(refProgress["lip"] === "true") ? "Complete" : "Progress"} <br/>
                Subsetting LMA  : {(refProgress["lma"] === "true") ? "Complete" : "Progress"} <br/>
            </Typography>
        </Paper>
    </Box>
    );
}


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" {...props} />
        </Box>
        {/* <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
                {`${Math.round(props.value)}%`}
            </Typography>
        </Box> */}
        </Box>
    );
}