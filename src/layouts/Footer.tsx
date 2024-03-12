"use client";
import { SubscribeForm } from "@/components/SubscribeForm";
import React, { useState } from "react";
import Image from "next/image";
import "@styles/layouts/footer.scss";
import Logo from "@images/gps-logo-white.png";
import Link from "next/link";
import Section from "./Section";

export const Footer = () => {

  return (
    <Section title={""} maxContent className="section">
    <div className="footer">
      <div className="details-container">
        <div className="about-conatiner">
          <span className="title">{"About us"}</span>

          <Image src={Logo} width={150} alt={""} />
          <span className="desc">
            {`Global Prostate Solutions, established in 2012, is an innovative UK-based company specializing in comprehensive prostate biopsy solutions. With an experienced 24/7 team and a commitment to excellent customer service, we provide cutting-edge diagnostic services for accurate and timely prostate cancer detection.
            `}
          </span>

          <div className="mt-6" />

          <div className="flex md:flex-row flex-col-reverse w-full">
            <span className="desc ">
              {`Address:`}
              <br />
              &nbsp;&nbsp;&nbsp;{`Unit 6 Cherrytree Farm Blackmore End Road`}
              <br />
              &nbsp;&nbsp;&nbsp;{`Sible Hedingham, Halstead, England, CO9 3LZ`}
              <br />
              <div className="mt-2" />
              {`Available 24x7`}
              <br />
            </span>

            <div className="desc md:ml-3">
              {"Support & Sale:"}
              <br />
              <Link className="desc" href={"tel:+44 (0) 124 539 2110"}>
                &nbsp;&nbsp;&nbsp;{"+44 (0) 124 539 2110"}
              </Link>
              <br />
              <Link className="desc" href={"mailto:query.globalps@gmail.com"}>
                &nbsp;&nbsp;&nbsp;{`query.globalps@gmail.com`}
              </Link>
              <br />

              <div className="mt-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="form-container">
        <SubscribeForm />
      </div>
    </div>
    </Section>
  );
};
