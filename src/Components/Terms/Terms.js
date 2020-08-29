import React from 'react'
import FormPage from '../FormPage/FormPage'
import ImportContactsIcon from '@material-ui/icons/ImportContacts'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core/styles'
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import {PRIVACY_POLICY, HOME} from '../../Routes/routes'
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

export default function Forms() {
    const classes = styles();
    const history = useHistory();

    const handleClick = () =>{
        history.goBack();  
    }
    return (
        <FormPage icon={<ImportContactsIcon/>} title='Terms of Service'>

            <Box margin='0 auto' padding='0 16px' marginTop='-16px' maxWidth='600px'>
                <Typography align='center' color='textPrimary' variant='subtitle2'  paragraph>
                        Please read these terms of service carefully before using www.appstractorart.com
                </Typography>
            </Box>
           
            <Box className={classes.container}> 

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                    Conditions of Use
                </Typography>

                <Typography color='textPrimary' paragraph variant='body2'>
                    We will provide these services to you, which are subject to the conditions stated below in this document. Every time you visit this website or use its services, you accept the following conditions. This is why we urge you to read them carefully.
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                    Privacy Policy
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    Before you continue using our website we advise you to read our <Link  color='textPrimary' className={classes.privacy} component={RouterLink} to={PRIVACY_POLICY} >
                    privacy policy
                </Link> regarding our user data collection. It will help you better understand our practices.                
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                Copyright
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    Content created on this website is the property of Appstractor and/or its content creators and protected by international copyright laws. The entire compilation of the content found on this website is the exclusive property of Appstractor.
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                Communications
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                    The entire communication with us is electronic. Every time you send us an email or visit our website, you are going to be communicating with us. You hereby consent to receive communications from us. We will continue to communicate with you by posting news and notices on our website and by sending you emails. You also agree that all notices, disclosures, agreements and other communications we provide to you electronically meet the legal requirements that such communications be in writing.
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                Applicable Law
                 </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                By visiting this website, you agree that the laws of Maryland, without regard to principles of conflict laws, will govern these terms of service, or any dispute of any sort that might come between Appstractor and you, or its business partners and associates.
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                Disputes
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                Any dispute related in any way to your visit to this website or to products you purchase from us shall be arbitrated by the state or federal court of Maryland and you consent to exclusive jurisdiction and venue of such courts.
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                Content
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                Visitors may create content as long as it is not obscene, illegal, defamatory, threatening, infringing of intellectual property rights, invasive of privacy or injurious in any other way to third parties. We reserve all rights (but not the obligation) to remove and/or edit such content. When you post your content, you grant Appstractor non-exclusive, royalty-free and irrevocable right to use, reproduce, publish, modify such content throughout the world in any media.
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                License and Site Access
                </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                We grant you a limited license to access and make personal use of this website. You are not allowed to download or modify it. This may be done only with written consent from us.
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                User Account
                 </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                If you are an owner of an account on this website, you are solely responsible for maintaining the confidentiality of your private user details (email and password). You are responsible for all activities that occur under your account or password. We reserve all rights to terminate accounts, edit or remove content and cancel orders in their sole discretion.
                </Typography>

                <Typography color='textPrimary' className={classes.title} gutterBottom variant='subtitle1'>
                Warranty and Liability
                 </Typography>

                <Typography color='textPrimary'  paragraph variant='body2'>
                This website and its content are provided "as is". Appstraction does not represent or warrant that the website or its content will meet your requirements or that their use will be uninterrupted or error free. Appstractor will not be liable to you or to any other person or entity for any damages or losses arising out of your use of the website or its content.
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