import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { subsetFilenamesListEndpoint, subsettingApiKey } from "../../../config";
import axios from "axios";

import CircularProgressBar from './circularProgressBar';
import DetailedProgressBar from './progressDetailed';
import {code as downloadScript} from '../helper/downloadScript.js';
import { connect } from 'react-redux';
import { mapStateToProps } from '../redux/wsMessage';
import { Resources, mapStateToProps as mapStateToPropsSubsetList, actionDispatchers } from "../redux/subsetDownloadList";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function _SubsetCard(props) {
  const {subsetDir, subsetIndex} = props;
  const dlScript = downloadScript(subsetDir);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  // get wsId from subsetDir. Unique ID is used for both ws id and creating unique dir.
  const progressbarWsId = subsetDir.split("/subset-")[1].split("/")[0];
  const progress = props.progressbarSubsettingTool[`${progressbarWsId}`];

  /** Progress bar logic start */
  let progressPercentage = 0;
  if (progress) {
    progressPercentage = (progress.length / 7) * 100;
    // also call for list of downloadable items.
    const config = { headers: {
        Accept: "application/json",
      }
    }
    config.headers['x-api-key'] = subsettingApiKey;
    Resources.body = {
      "wsTokenId": `subset-${progressbarWsId}`
    }
    axios
      .post(subsetFilenamesListEndpoint, Resources.body, config)
      .catch(e => e.response)
      .then(res => {
        let downloadList = res.data;
        // dispatch. The updated states after dispatch are used to list out downloadable subsets
        props.updateProgressbar({"wstokenid": progressbarWsId, "downloadList": downloadList.subsetfiles});
      });
  }
  /** Progress bar logic end */

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} style={{maxWidth: "initial"}}>
      <CardHeader
        title={`Subset ${subsetIndex+1}`}
        // subheader="Date time"
      >
      </CardHeader>
      <CardContent>
      <Box style={{textAlign: "right"}}>
        <CircularProgressBar value={Number(progressPercentage)}/>
      </Box>
        <Typography variant="body2" color="textSecondary" component="p">
          {}
          Expand to see the detailed progress and download the completed subsets.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="download">
          <CloudDownloadIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Progress:</Typography>
          <DetailedProgressBar progressPercentage={progressPercentage} progress={progress}/>
          <Divider/>
          <br/>
          <Typography paragraph>Subsets:</Typography>
          <div>
            {props.downloadListSubsettingTool[`${progressbarWsId}`] && props.downloadListSubsettingTool[`${progressbarWsId}`].map(elem => (<div><a href={elem.url}>{elem.name}</a></div>))}
          </div>
          {/* <Typography paragraph>Code:</Typography>
            <CodeHighlight className="code_block">
              {dlScript}
            </CodeHighlight> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}

const SubsetCard = connect(mapStateToPropsSubsetList, actionDispatchers)(connect(mapStateToProps, null)(_SubsetCard));
export default SubsetCard;