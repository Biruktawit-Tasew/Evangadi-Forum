import React from "react";
import style from "./footer.module.css";
import logo from "../../assets/evangadi-logo-footer.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <section className={style.footer_container}>
      <section className={style.footer_inner_container}>
        {/* left side links wrapper */}
        <div className={style.left_side_links}>
          <div className={style.footer_logo}>
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>
          <div>
            <a href="https://www.facebook.com/evangaditech" target="_blank">
              <FacebookOutlinedIcon size={30} />
            </a>
            <a href="https://www.instagram.com/evangaditech" target="_blank">
              <InstagramIcon size={30} />
            </a>
            <a href="https://www.youtube.com/@EvangadiTech" target="_blank">
              <YouTubeIcon size={30} />
            </a>
          </div>
        </div>
        {/* middle links wrapper */}
        <div className={style.middle_links}>
          <h4>Useful link</h4>
          <p>
            <a href="how-it-works">How it works</a>
          </p>
          <p>
            <a href="https://www.evangadi.com/legal/terms/" target="_blank">
              Terms of Service
            </a>
          </p>
          <p>
            <a href="https://www.evangadi.com/legal/privacy/" target="_blank">
              Privacy policy
            </a>
          </p>
        </div>
        {/* right side links wrapper */}
        <div className={style.right_side_links}>
          <h4>Contact Info</h4>
          <p>
            <a href="/">Evangadi Networks</a>
          </p>
          <p>support@evangadi.com</p>
          <p>+1-202-386-2702</p>
        </div>
      </section>
    </section>
  );
}

export default Footer;
