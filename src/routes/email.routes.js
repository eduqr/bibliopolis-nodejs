import { Router } from "express";
import { enviarMail, VerifiCarOTP } from "../controllers/email.controller.js";

const router = Router();

router.post("/send-email", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await enviarMail(email);
    res
      .status(200)
      .json({
        message: "OTP sent successfully",
        messageId: result.info.messageId,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const result = await VerifiCarOTP(email, otp);
    if (result.success) {
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(401).json({ message: result.message });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
});

export default router;
