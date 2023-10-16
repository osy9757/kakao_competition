import "../../styles/common/Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="tourfooter">
        <div className="footertop">
          <div className="aboutteam">
            <h3>About Team</h3>
            <p>어서와~여기는 처음이지</p>
          </div>
          <div className="pages">
            <h3>Pages</h3>
            <p>Services</p>
            <p>About</p>
            <p>Subscribe</p>
          </div>
          <div className="resources">
            <h3>Resources</h3>
            <p>한국 관광공사</p>
            <p>카카오</p>
          </div>
          <div className="contact">
            <h3>Contact</h3>
            <p>welcome2ko@gmail.com</p>
            <p>+1 222 212 3819</p>
            <p>서울시</p>
          </div>
        </div>
        <div className="footerdown">
          <p>Copyright ©2023. All Rights Reserved. — Designed by J and D</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
