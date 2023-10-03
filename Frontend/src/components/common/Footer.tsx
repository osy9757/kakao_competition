import "../../styles/common/Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="tourfooter">
        <div className="footertop">
          <div className="aboutteam">
            <h3>About Team</h3>
            <p>
              간략한 팀 설명 어쩌구 <br />
              ~~~ <br />
              ~~~~ <br />
            </p>
          </div>
          <div className="pages">
            <h3>Pages</h3>
            <p>Services</p>
            <p>About</p>
            <p>Subscribe</p>
          </div>
          <div className="resources">
            <h3>Resources</h3>
            <p>A</p>
            <p>B</p>
            <p>C</p>
          </div>
          <div className="contact">
            <h3>Contact</h3>
            <p>mail@example.com</p>
            <p>+1 222 212 3819</p>
            <p>서울시 주소 샬라샬라</p>
          </div>
        </div>
        <div
          className="footerdown"
          style={{ height: "60px", alignItems: "center" }}
        >
          <p>Copyright ©2023. All Rights Reserved. — Designed by J and D</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
