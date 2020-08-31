import React from 'react'
import FormPage from '../FormPage/FormPage'
import ScreenLockPortraitIcon from '@material-ui/icons/ScreenLockPortrait'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import {HOME} from '../../Routes/routes'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button'

const styles = makeStyles(theme => ({
    title: {
        fontWeight: theme.typography.fontWeightMedium,
        textDecoration: 'underline'
    },
    container:{
        margin:'0 auto', 
        backgroundColor: 'rgba(0,0,0,.23)', 
        padding:'16px', 
        maxWidth:'600px',
        marginBottom: theme.spacing(2)
    }, 
    link:{
        margin: '0 auto',
        color: theme.palette.text.primary,
        textAlign: 'center',
        marginTop: 16,
    },  
    privacy: {
        textDecoration: 'underline'
    }
}))

export default function Privacy() {
    const classes = styles();
    const history = useHistory();

    const handleClick = () =>{
        history.goBack();  
    }
    return (
        <FormPage icon={<ScreenLockPortraitIcon/>} title='Privacy Policy'>

            <Box margin='0 auto' padding='0 16px' marginTop='-16px' maxWidth='600px'>
                <Typography align='center' color='textPrimary' variant='subtitle2'  paragraph>
                        Please read this privacy policy carefully before using www.appstractorart.com
                </Typography>
            </Box>
           
            <Box className={classes.container}> 

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                Collecting and Using Personal Data
                </Typography>

                <Typography color='textPrimary' paragraph variant='body2'>
                    While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to: Email Address, Usage Data.                
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                    Usage Data
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    Usage Data may include information such as your device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                Tracking Technologies and Cookies
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    We use cookies and similar tracking technologies to track the activity on our service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze our service.
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                    Retention of Personal Data
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    Appstractor will retain your personal data only for as long as is necessary for the purposes set out in this privacy policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies. 
                    The Company will also retain usage data for internal analysis purposes. 
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                    Transfer of Personal Data
                 </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    Your information, including personal data, is processed at Appstractor’s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
                 </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                    Disclosure of Personal Data
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    If Appstractor is involved in a merger, acquisition or asset sale, your personal data may be transferred. We will provide notice before your personal data is transferred and becomes subject to a different privacy policy.                
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                    Law Enforcement
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    Under certain circumstances, Appstractor may be required to disclose your personal data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                    Security of Personal Data
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    The security of your personal data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                    Links to Other Websites
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    Our service may contain links to other websites that are not operated by us. If You click on a third party link, you will be directed to that third party's site. We strongly advise you to review the privacy policy of every site you visit.
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                    Changes to this Privacy Policy
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. We will let you know via email and/or a prominent notice on our service, prior to the change becoming effective. 
                </Typography>
            </Box>

            <Box margin='0 auto'>
                <Button onClick={handleClick} color="secondary" type='submit'  variant='contained'>
                    Go Back
                </Button>
            </Box>

            <Link component={RouterLink} to={HOME} className={classes.link}>
                Return to Home
            </Link>
        </FormPage>
    )
}