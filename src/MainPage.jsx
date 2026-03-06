import React from 'react';
import { Box, Typography, Container, Grid, Card, ThemeProvider, createTheme, CssBaseline, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, MapPin, Phone, Mail } from 'lucide-react';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#D4AF37', // Gold
        },
        background: {
            default: '#FDFDFD',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1A1A1A',
            secondary: '#555555',
        }
    },
    typography: {
        fontFamily: '"Outfit", "Inter", sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-0.02em', color: '#111' },
        h2: { fontWeight: 700, letterSpacing: '-0.01em', color: '#222' },
        h3: { fontWeight: 600, color: '#333' },
    },
});

export default function MainPage() {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', pt: 10 }}>
                {/* Header Logo & Top Contact Info */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, background: 'linear-gradient(to bottom, rgba(253,253,253,0.95), rgba(253,253,253,0))' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: 45, height: 45, border: '2px solid #D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, boxShadow: '0 0 15px rgba(212,175,55,0.3)', background: '#FFF' }}>
                            <Typography variant="h6" color="primary" fontWeight="bold">RC</Typography>
                        </Box>
                        <Typography variant="h5" fontWeight="bold" letterSpacing="0.1em" sx={{ textTransform: 'uppercase', color: '#111', textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>Radiant</Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Phone size={16} color="#D4AF37" />
                            <Typography variant="caption" sx={{ letterSpacing: '0.05em', color: '#444', fontSize: '0.75rem', fontWeight: 'bold' }}>+91 99354 99683</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Mail size={16} color="#D4AF37" />
                            <Typography variant="caption" sx={{ letterSpacing: '0.05em', color: '#444', fontSize: '0.75rem', fontWeight: 'bold' }}>Sanjaysinghcontractor9@gmail.com</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MapPin size={16} color="#D4AF37" />
                            <Typography variant="caption" sx={{ letterSpacing: '0.05em', color: '#444', fontSize: '0.75rem', fontWeight: 'bold' }}>Sector-4, Vikas Nagar</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Hero */}
                <Container maxWidth="lg" sx={{ textAlign: 'center', mb: 15, mt: 10 }}>
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
                        <Typography variant="h6" color="primary" gutterBottom sx={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 'bold' }}>
                            Excellence Since 1989
                        </Typography>
                        <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '3rem', md: '5rem' }, mb: 4, textShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            Building <span style={{ color: '#D4AF37' }}>Tomorrow's</span> Legacy
                        </Typography>
                        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', mb: 4, lineHeight: 1.6 }}>
                            Delivering uncompromised work quality, an unmatched variety of elite projects, and building the future of Lucknow, one masterpiece at a time.
                        </Typography>
                    </motion.div>
                </Container>

                {/* Stats */}
                <Container maxWidth="md" sx={{ mb: 20 }}>
                    <Grid container spacing={4} justifyContent="center">
                        {[
                            { number: '250+', label: 'Houses Built' },
                            { number: '35', label: 'Years of Trust' },
                            { number: '100%', label: 'Work Quality' }
                        ].map((stat, i) => (
                            <Grid item xs={12} md={4} key={i}>
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}>
                                    <Card sx={{
                                        textAlign: 'center', p: 4,
                                        background: '#FFFFFF',
                                        border: '1px solid #EAEAEA',
                                        borderTop: '1px solid #F5F5F5',
                                        borderLeft: '1px solid #F5F5F5',
                                        borderRadius: '20px',
                                        boxShadow: '15px 15px 40px rgba(0,0,0,0.04), -5px -5px 20px rgba(255,255,255,0.8)',
                                        transition: 'transform 0.3s',
                                        '&:hover': { transform: 'translateY(-5px)' }
                                    }}>
                                        <Typography variant="h2" color="primary" gutterBottom sx={{ textShadow: '0 0 15px rgba(212,175,55,0.2)' }}>{stat.number}</Typography>
                                        <Typography variant="h6" color="text.secondary" fontWeight="bold">{stat.label}</Typography>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Clients */}
                <Container maxWidth="xl" sx={{ mb: 20, px: { xs: 2, md: 8 } }}>
                    <Typography variant="h3" textAlign="center" gutterBottom sx={{ mb: 8, textShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                        Our Prestigious Clients
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {[
                            { title: 'City Montessori School (CMS)', desc: 'Institutional construction reflecting academic excellence and modern infrastructure.' },
                            { title: 'SPL Plastic Factory', desc: 'Both industrial and residential work done extensively and cohesively for the client.' },
                            { title: 'Ambedkar Nagar RTO', desc: 'Robust government infrastructure built with precision, compliance, and immense scale.' },
                            { title: 'Villas & Bungalows', desc: 'Elite private residential projects crafted for high-net-worth individuals.' },
                            { title: 'Pilibhit Stadium Project', desc: 'Expansive sports infrastructure built to accommodate large-scale public events.' },
                        ].map((client, i) => (
                            <Grid item xs={12} sm={6} md={3} key={i}>
                                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ height: '100%' }}>
                                    <Card sx={{
                                        display: 'flex', flexDirection: 'column', height: '100%', p: 4,
                                        background: 'linear-gradient(145deg, #FFFFFF, #F8F8F8)',
                                        border: '1px solid #EFEFEF', borderTop: '1px solid #FFF', borderLeft: '1px solid #FFF',
                                        borderRadius: '16px',
                                        boxShadow: '10px 10px 30px rgba(0,0,0,0.05), -5px -5px 15px rgba(255,255,255,0.8)',
                                        '&:hover': {
                                            borderColor: '#D4AF37',
                                            transform: 'translateY(-10px) scale(1.02)',
                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                            boxShadow: '0 20px 40px rgba(0,0,0,0.08), inset 0 0 20px rgba(212,175,55,0.05)'
                                        }
                                    }}>
                                        <CheckCircle2 color="#D4AF37" size={40} style={{ marginBottom: '24px' }} />
                                        <Typography variant="h5" gutterBottom fontWeight="bold" color="text.primary">{client.title}</Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, flexGrow: 1 }}>{client.desc}</Typography>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Testimonials */}
                <Container maxWidth="xl" sx={{ mb: 10, px: { xs: 2, md: 8 } }}>
                    <Typography variant="h3" textAlign="center" gutterBottom sx={{ mb: 8, textShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                        Phenomenal Reviews
                    </Typography>
                    <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: '1200px', mx: 'auto' }}>
                        {[
                            { name: "Rajiv Khaitan", loc: "Gomti Nagar", initial: "R", review: "Their attention to structural integrity while maintaining aesthetic elegance is unmatched." },
                            { name: "Anil Srivastava", loc: "Hazratganj", initial: "A", review: "The precision with which they delivered our showroom before the deadline was staggering." },
                            { name: "Dr. Meera Singh", loc: "Indira Nagar", initial: "M", review: "The 3D-level planning gave us immense confidence. My villa is truly a masterpiece." },
                            { name: "Vikram Ahuja", loc: "Aliganj", initial: "V", review: "From compliance to delivering stellar quality on the factory floor, they are perfect." },
                            { name: "Priya Desai", loc: "Sushant Golf", initial: "P", review: "The interior finish and lighting they integrated are straight out of an architectural magazine." },
                            { name: "K. N. Pandey", loc: "Mahanagar", initial: "K", review: "They have the most experienced site engineers and it shows in faultless complex geometric executions." }
                        ].map((rev, i) => (
                            <Grid item xs={12} sm={6} md={4} key={i}>
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ height: '100%' }}>
                                    <Card sx={{
                                        p: 3, height: '100%', display: 'flex', flexDirection: 'column',
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,250,250,0.95))',
                                        border: '1px solid rgba(212,175,55,0.2)',
                                        borderTop: '2px solid rgba(212,175,55,0.4)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.03)',
                                        transition: 'transform 0.2s',
                                        '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 15px 30px rgba(0,0,0,0.06)' }
                                    }}>
                                        <Box sx={{ display: 'flex', mb: 2 }}>
                                            {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#D4AF37" color="#D4AF37" />)}
                                        </Box>
                                        <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 3, lineHeight: 1.6, color: '#555', flexGrow: 1 }}>
                                            "{rev.review}"
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ bgcolor: '#D4AF37', color: '#FFF', width: 32, height: 32, fontSize: '0.9rem', mr: 2, fontWeight: 'bold' }}>{rev.initial}</Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '0.85rem', color: '#222' }}>{rev.name}</Typography>
                                                <Typography variant="caption" color="text.secondary">{rev.loc}, UP</Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {/* Footer / Contact Section */}
                <Box sx={{
                    mt: 10, pt: 10, pb: 6,
                    borderTop: '1px solid rgba(212,175,55,0.2)',
                    background: 'linear-gradient(to bottom, #F9F9F9, #F0F0F0)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}>
                    <Box sx={{ width: 60, height: 60, border: '2px solid #D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, boxShadow: '0 0 20px rgba(212,175,55,0.15)', background: '#FFF' }}>
                        <Typography variant="h5" color="primary" fontWeight="bold">RC</Typography>
                    </Box>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 6, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#111', textShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        Radiant <span style={{ color: '#D4AF37' }}>Construction</span>
                    </Typography>

                    <Grid container spacing={4} maxWidth="lg" justifyContent="center" sx={{ mb: 8, textAlign: 'center', px: 2 }}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAEAEA', height: '100%', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
                                <Phone size={32} color="#D4AF37" style={{ marginBottom: '16px' }} />
                                <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">Call Us</Typography>
                                <Typography variant="body1" color="text.secondary" fontWeight="medium">+91 99354 99683</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAEAEA', height: '100%', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
                                <Mail size={32} color="#D4AF37" style={{ marginBottom: '16px' }} />
                                <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">Email</Typography>
                                <Typography variant="body2" color="text.secondary" fontWeight="medium" sx={{ wordBreak: 'break-all' }}>Sanjaysinghcontractor9@gmail.com</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, background: '#FFFFFF', borderRadius: '16px', border: '1px solid #EAEAEA', height: '100%', boxShadow: '0 5px 15px rgba(0,0,0,0.03)' }}>
                                <MapPin size={32} color="#D4AF37" style={{ marginBottom: '16px' }} />
                                <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">Head Office</Typography>
                                <Typography variant="body2" sx={{ color: '#333', fontWeight: 'bold', mb: 0.5 }}>Sanjay Kumar Singh (Founder)</Typography>
                                <Typography variant="body2" color="text.secondary">4/939-c Vikas Nagar Sector -4</Typography>
                                <Typography variant="body2" color="text.secondary">Lucknow, UP 226022</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Typography variant="body2" color="#888" sx={{ letterSpacing: '0.05em' }}>© 2026 Radiant Construction. Built with excellence.</Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
