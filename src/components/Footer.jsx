import footerStyles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={footerStyles.footer}>
            <div className={footerStyles.container}>
                <div className={footerStyles.content}>
                    <div className={footerStyles.copyright}>
                        Copyright © {new Date().getFullYear()} Gestion Escuela. Todos los derechos reservados.
                    </div>
                    <div className={footerStyles.links}>
                        <a href="#">Privacidad</a>
                        <a href="#">Términos</a>
                        <a href="#">Mapa del sitio</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
