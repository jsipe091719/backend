const { hashPassword } = require("./../../utils/password");
const { RegistrationService } = require("./registration.service");

const { REGISTER, UPDATE } = RegistrationService;

const Controller = {
  Register: async (req, res) => {
    try {
      const { password, ...payload } = req.body;
      const avatar = req?.file?.filename;

      if (!password) throw new Error("Password is required.");

      const hashedPassword = await hashPassword(password);

      const { accessToken } = await REGISTER({
        ...payload,
        hashedPassword,
        avatar,
      });

      res.json({
        accessToken,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },

  Update: async (req, res) => {
    try {
      const { id } = req.params;
      const avatar = req?.file?.filename;
      const {
        mobileNumber,
        currentAddress,
        employment_status,
        current_job,
        year_current_job,
        position_current_job,
        employment_type,
        place_current_job,
        furtherStudies,
        enrollFurtherStudies,
        eligibility,
      } = req.body;

      const { accessToken } = await UPDATE({
        mobileNumber,
        currentAddress,
        avatar,
        employment_status,
        current_job,
        year_current_job,
        position_current_job,
        employment_type,
        place_current_job,
        furtherStudies,
        enrollFurtherStudies,
        eligibility,
        id,
      });
      res.json({
        accessToken,
      });
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
};

module.exports = {
  Controller,
};
