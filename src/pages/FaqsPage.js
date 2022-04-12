import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

const Faqs = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const sx = { width: "50%", flexShrink: 0, color: "#175a08", fontWeight: 700 };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          component="a"
          variant="contained"
          style={{ margin: "20px 0" }}
          href="./loan-form.xlsx"
          download
          startIcon={<DownloadIcon />}
          target="_blank"
        >
          Download Form
        </Button>
      </div>

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={sx}>
            1. What is the duration of short term and long term?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Short term is ranging from 1 to 6 months while the long term is
            ranging from 7 - 24 months.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={sx}>
            2. How long will it take to approve my request of loan?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            It depends, we are reviewing your data for us to ensure that you are
            capable of paying the amount you wanted.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={sx}>
            3. How can I estimate my monthly depending on the amount of my
            desired using your calculator page? Is it accurate?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            It is just a very simple step, by that you can now be able to
            determine what would be your monthly, but the result is just an
            estimation.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={sx}>
            4. What would happen if I forgot to pay my monthly?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The staff of the school will inform you about that.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography sx={sx}>
            5. Is this app really reliable, are they really active and
            responsive about my request?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, we are checking it and monitor about all the request of
            borrower.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography sx={sx}>
            6. What are the different types of loan you are offering?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul style={{ paddingLeft: 16 }}>
            <li>Regular Loan</li>
            <li>Multipurpose Loan</li>
            <li>Share Capital Loan</li>
            <li>Emergency Loan</li>
            <li>Commodity Loan</li>
            <li>Salary Loan</li>
            <li>Travel Loan</li>
            <li>Consolidated Loan</li>
          </ul>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography sx={sx}>
            7. What are the requirements for each type of loan?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ marginBottom: 10 }}>
            a. Regular Loan (loanable amount is same amount of your share
            capital) Filled-Up Application Form with Member/borrower’s signature
            Payslip
          </Typography>
          <Typography style={{ marginBottom: 10 }}>
            b. Multipurpose Loan (maximum of P150,000) Filled-Up Application
            Form with Member/borrower’s signature Payslip Co-Maker (Co-maker
            must signed to the application form of the member/borrower)
          </Typography>
          <Typography style={{ marginBottom: 10 }}>
            c. Share Capital Loan (maximum amount up to P50,000) Filled-Up
            Application Form with Member signature Payslip (please take note
            that cooperative will allow only if the member/borrower’s still have
            capacity to pay)
          </Typography>
          <Typography style={{ marginBottom: 10 }}>
            d. Emergency Loan (maximum amount up to P20,000) Filled-Up
            Application Form with Member/borrower’s signature Payslip Proof that
            the loan will be used in house construction due to typhoon and other
            fortuitous events, hospitalization, education, and any other
            emergency cases.
          </Typography>
          <Typography style={{ marginBottom: 10 }}>
            e. Commodity Loan (depends on the price of item but not to exceed
            P100,000) Filled-Up Application Form with Member/borrower’s
            signature Payslip Quotation from accredited suppliers of CvSUMPC
            (example: Abenson)
          </Typography>
          <Typography style={{ marginBottom: 10 }}>
            f. Salary Loan (maximum of P200,000) Filled-Up Application Form with
            Member/borrower’s signature Payslip Co-Maker (Co-maker must signed
            to the application form of the member/borrower)
          </Typography>
          <Typography>
            g. Travel Loan (maximum of P100,000) Filled-Up Application Form with
            Member/borrower’s signature Payslip Note: Amount of loan will be
            approved based on the capacity to pay of member/borrower.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Faqs;
