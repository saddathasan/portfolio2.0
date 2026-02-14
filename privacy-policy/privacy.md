# Privacy Policy

**Effective Date:** February 14, 2026

## Introduction

The **IB Attendance Tracker** ("we", "our", or "the extension") is an internal productivity tool developed by **saddathasan** for InfinitiBit's employees. This tool is designed to simplify daily attendance tracking within the company's ecosystem. We respect your privacy and are committed to protecting the limited data we collect. This Privacy Policy explains our data practices in compliance with the Chrome Web Store Developer Program Policies.

## 1. Information We Collect

We collect the minimum amount of data necessary to provide the attendance tracking service:

- **Authentication Data:** We access the `access_token` session cookie from `https://ai-hrms.infinitibit.com` to verify your identity and authorize your attendance actions.
- **Network Information:** We collect your public IP address via `api.ipify.org` solely for verifying your network location, as required by **InfinitiBit**'s attendance policy.
- **Attendance Activity:** We collect timestamps when you manually trigger actions such as "Start Day", "Break", "Resume Work", and "End Day".

## 2. How We Use Your Information

Your information is used strictly for the following purposes:

- **Service Functionality:** To record your work hours and break times accurately in **InfinitiBit**'s centralized AI-HRMS system.
- **Synchronization:** To ensure your local extension state (timers, status) matches your official attendance record.
- **Compliance:** Verifying logging locations via IP address tagging on attendance records.

## 3. Data Storage and Security

- **Local Storage:** We use your browser's local storage (`chrome.storage.local`) to cache your current status, user profile (name, job title), and daily activity timestamps. This data resides on your device to ensure the extension functions across browser restarts.
- **External Storage:** All permanent confirmed attendance records are transmitted securely via HTTPS to **InfinitiBit**'s servers (`ai-hrms.infinitibit.com`). The extension itself does not maintain a separate database of your history.

## 4. Third-Party Sharing

We do not sell, trade, or rent your personal identification information to others. Data is shared only with:

- **InfinitiBit (Your Employer):** Attendance data and IP addresses are sent to the company's HRMS system as the primary function of this tool.
- **Ipify:** Your IP address is processed by `ipify.org` strictly for retrieval purposes.

## 5. User Control

You certify your attendance actions manually. You can clear the extension's local cache at any time by uninstalling the extension or clearing your browser's extension data, though this does not affect records already submitted to the HRMS system.

## 6. Contact us

If you have questions about this Privacy Policy or the data practices of this extension, please contact **InfinitiBit**'s HR department or the developer team at:

**Company:** hydra lab.
**Email:** saddathasan94@gmail.com
