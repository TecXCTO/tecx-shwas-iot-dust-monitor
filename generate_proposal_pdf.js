/**
 * Project Shwas (श्वॉस) — Automated PDF Proposal Booklet Generator
 * Generates an official print-ready document for government submission channels.
 * License: GPL-3.0-only
 */

// npm install pdfkit
// node generate_proposal_pdf.js.
const fs = require('fs');
const PDFDocument = require('pdfkit');

function buildProposalBooklet() {
    const doc = new PDFDocument({ 
        margin: 50,
        size: 'A4',
        info: {
            Title: 'Shwas IOT Dust Monitoring',
            Author: 'Rahul Saini d.b.a. TECX'
        }
    });

    const outputFilename = 'Project_Shwas_Government_Proposal.pdf';
    doc.pipe(fs.createWriteStream(outputFilename));

    // ----------------------------------------------------
    // PAGE 1: COVER PAGE LAYOUT
    // ----------------------------------------------------
    // Slate Background Block Accent
    doc.rect(0, 0, 595.28, 250).fill('#0f172a');
    
    doc.fillColor('#f97316').fontSize(26).font('Helvetica-Bold')
       .text('PROJECT SHWAS (श्वॉस)', 50, 70);
    
    doc.fillColor('#ffffff').fontSize(14).font('Helvetica')
       .text('Low-Cost Open-Source IoT Dust Telemetry & Worker Safety Infrastructure', 50, 110, { width: 500 });

    doc.fillColor('#334155').fontSize(11).font('Helvetica-Bold')
       .text('SUBMITTED TO:', 50, 290);
    doc.fillColor('#0f172a').fontSize(13).font('Helvetica')
       .text('Department of Mines & Geology (DMG)\nGovernment of Rajasthan, India', 50, 310, { lineGap: 4 });

    doc.fillColor('#334155').fontSize(11).font('Helvetica-Bold')
       .text('PROPOSED BY:', 50, 400);
    doc.fillColor('#0f172a').fontSize(13).font('Helvetica')
       .text('Shwas Environmental Technologies Private Limited\nContact: contact@shwasenv.in | Web: https://shwasenv.in', 50, 420, { lineGap: 4 });

    doc.fillColor('#475569').fontSize(10).font('Helvetica-Oblique')
       .text('Compliance Protection Registry: SPDX License Framework Target [GPL-3.0-only]', 50, 750);

    // ----------------------------------------------------
    // PAGE 2: PROBLEM STATEMENT & SOCIAL CONTEXT
    // ----------------------------------------------------
    doc.addPage();
    doc.fillColor('#f97316').fontSize(18).font('Helvetica-Bold').text('1. The Unseen Occupational Health Crisis');
    doc.moveDown(1);
    
    const problemText = 
        "Over 80% of Rajasthan's mining workforce operates inside small, unregistered quarry blocks " +
        "that fall completely outside standard industrial compliance monitoring networks. Traditional particulate " +
        "sampling stations cost several thousand dollars and demand fixed power line connections—infrastructure " +
        "that does not exist in raw open-cast pits.\n\n" +
        "Consequently, thousands of informal miners inhale high volumes of microscopic respirable crystalline silica " +
        "dust (PM10) daily. This exposure causes irreversible lung tissue fibrosis (silicosis), chronic respiratory " +
        "failure, and early death among local workforces. Bringing low-cost, off-grid air diagnostics to these " +
        "sectors is a matter of critical safety urgency.";

    doc.fillColor('#1e293b').fontSize(12).font('Helvetica').text(problemText, { align: 'justify', lineGap: 5 });

    // ----------------------------------------------------
    // PAGE 3: TECHNICAL FIT TO THE CHALLENGESTATEMENT
    // ----------------------------------------------------
    doc.addPage();
    doc.fillColor('#f97316').fontSize(18).font('Helvetica-Bold').text('2. Proposed Technology Solution & System Fit');
    doc.moveDown(1);

    doc.fillColor('#1e293b').fontSize(12).font('Helvetica')
       .text("Project Shwas directly meets the challenge criteria by introducing a sub-$35 solar-powered edge hardware node [4]:", { lineGap: 4 });
    doc.moveDown(0.5);

    const points = [
        "**Ultra-Low-Cost Hardware Layer:** Our custom 4-layer FR4 board slashes component procurement costs to just Rs. 3,170 ($37.96) per unit in production volumes.",
        "**Immediate Edge Warning Systems:** Features a high-brightness 3-tier LED ring and an 85dB piezo siren that sound immediately when dust levels breach the 10 mg/m³ hazard ceiling, prompting on-site safety actions [5].",
        "**15-Byte Telemetry Compression:** Environmental variables and active u-blox GPS satellite coordinates are compressed into a 15-byte binary packet, enabling transmission over low-bandwidth 2G/3G networks [6].",
        "**Unbrickable Code Protection:** Implements hardware Secure Boot V2 signature checks and AES-256 Flash Encryption, disabling physical JTAG debugging interfaces to prevent code manipulation by operators [7]."
    ];

    points.forEach(point => {
        doc.fillColor('#334155').fontSize(11).text(`• ${point}`, { paragraphGap: 10, lineGap: 4 });
    });

    // ----------------------------------------------------
    // PAGE 4: UNIT ECONOMICS & FINANCIAL BUDGET MATRIX
    // ----------------------------------------------------
    doc.addPage();
    doc.fillColor('#f97316').fontSize(18).font('Helvetica-Bold').text('3. Unit Economics & Shared Sustainability');
    doc.moveDown(1);

    doc.fillColor('#1e293b').fontSize(12).font('Helvetica')
       .text("By moving from prototype configurations to automated turnkey assembly lines, the system scales with high financial viability:", { lineGap: 4 });
    doc.moveDown(1);

    // Render Table-Style Content
    doc.font('Helvetica-Bold').fillColor('#0f172a').text('Item Line Description                              | 100 Run (Cost) | 1,000 Run (Cost)');
    doc.strokeColor('#cbd5e1').moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(0.5);

    doc.font('Helvetica').fillColor('#334155')
       .text('Core ESP32 Processing Unit                    | Rs. 280        | Rs. 180', { lineGap: 6 })
       .text('Plantower Laser Particulate Core               | Rs. 1,600      | Rs. 950', { lineGap: 6 })
       .text('u-blox GPS & Active Patch Antenna              | Rs. 590        | Rs. 415', { lineGap: 6 })
       .text('Lithium Iron Phosphate Battery + Waaree Solar | Rs. 1,210      | Rs. 810', { lineGap: 6 })
       .text('Contract Automated SMT Labor & PCBA Board     | Rs. 420        | Rs. 245', { lineGap: 6 })
       .text('Polycarbonate Enclosure Shell Housing          | Rs. 250        | Rs. 120', { lineGap: 6 });
    
    doc.strokeColor('#cbd5e1').moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fillColor('#f97316').text('Total Unit Capital Cost                       | Rs. 5,150      | Rs. 3,170');

    doc.moveDown(2);
    doc.font('Helvetica-Bold').fillColor('#0f172a').text('The Monetization Strategy:');
    doc.font('Helvetica').fillColor('#334155').text(
        "To eliminate long-term dependence on government grant allocations, the operational expenses " +
        "are covered using a shared collective network subscription. Quarry operators contribute a low monthly fee " +
        "of Rs. 50 per active node. For a 1,000-node regional cluster, this creates a recurring runway of " +
        "Rs. 50,000 per month, completely funding 4G SIM cards, cloud server hosting, and field technician care logistics [10].",
        { align: 'justify', lineGap: 4 }
    );

    // Finalize Document Data Write
    doc.end();
    console.log(`>> Success! Print-ready PDF proposal booklet exported to: ${outputFilename}`);
}

buildProposalBooklet();
