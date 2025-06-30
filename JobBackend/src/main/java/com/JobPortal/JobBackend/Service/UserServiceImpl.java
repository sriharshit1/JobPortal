package com.JobPortal.JobBackend.Service;

import com.JobPortal.JobBackend.DTO.*;
import com.JobPortal.JobBackend.Entity.OTP;
import com.JobPortal.JobBackend.Entity.User;
import com.JobPortal.JobBackend.Exception.JobPortalException;
import com.JobPortal.JobBackend.Repository.NotificationRepository;
import com.JobPortal.JobBackend.Repository.OTPRepository;
import com.JobPortal.JobBackend.Repository.UserRepository;
import com.JobPortal.JobBackend.Utility.Data;
import com.JobPortal.JobBackend.Utility.Utilities;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final OTPRepository otpRepository;
    private final ProfileService profileService;
    private final NotificationService notificationService;
    private final ApplicantService applicantService;



    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    @Override
    public UserDto registerUser(UserDto userDto) throws JobPortalException {
        Optional<User> optional = userRepository.findByEmail(userDto.getEmail());
        if(optional.isPresent()) throw new JobPortalException("USER_FOUND");
        userDto.setId(Utilities.getNextSequence("users"));
        userDto.setProfileId(profileService.createProfile(userDto.getName(),userDto.getEmail()));;
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
      User user = userDto.toEntity();
      user = userRepository.save(user);
        // ✅ CREATE Applicant entry if user signs up as an APPLICANT
        if (user.getAccountType().name().equals("APPLICANT")) {
            ApplicantDTO applicant = new ApplicantDTO();
            applicant.setApplicantId(user.getId()); // ID same as User ID
            applicant.setName(user.getName());
            applicant.setEmail(user.getEmail());
            applicantService.createApplicant(applicant);
        }
      return user.toDto();
    }

    @Override
    public UserDto getUserByEmail(String email) throws JobPortalException {
        return userRepository.findByEmail(email)
                .orElseThrow(()-> new JobPortalException("USER_NOT_FOUND")).toDto();
    }

    @Override
    public UserDto loginUser(LoginDto loginDto) throws JobPortalException {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(()-> new JobPortalException("USER_NOT_FOUND"));
        if(!passwordEncoder.matches(loginDto.getPassword(),user.getPassword())) throw new JobPortalException("INVALID_CREDENTIALS");
        return user.toDto();
    }

    @Override
    public Boolean sendOtp(String email) throws Exception {
         User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new JobPortalException("USER_NOT_FOUND"));
        MimeMessage mm = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mm,true);
        message.setFrom(fromEmail);
        message.setTo(email);
        message.setSubject("Your OTP Code");
        String genOtp = Utilities.generateOtp();
        OTP otp= new OTP(email,genOtp, LocalDateTime.now());
        otpRepository.save(otp);
        message.setText(Data.getMessageBody(genOtp,user.getName()),true);
        mailSender.send(mm);
        return true;
    }

    @Override
    public Boolean verifyOtp(String email,String otp) throws JobPortalException {
        OTP otpEntity = otpRepository.findById(email).orElseThrow(()-> new JobPortalException("OTP_NOT_FOUND"));
        if(!otpEntity.getOtpCode().equals(otp)) throw new JobPortalException("OTP_INCORRECT");

        return true;
    }

    @Override
    public ResponseDto changePassword(LoginDto loginDto) throws JobPortalException {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(()-> new JobPortalException("USER_NOT_FOUND"));
        user.setPassword(passwordEncoder.encode(loginDto.getPassword()));
        userRepository.save(user);
        NotificationDTO notify = new NotificationDTO();
        notify.setUserId(user.getId());
        notify.setMessage("Password reset Successful");
        notify.setAction("Password Reset");
        notificationService.sendNotification(notify);
        return new ResponseDto("Password changed Successfully");
    }

    @Scheduled(fixedRate = 60000)
    public void removeExpiredAt(){
        LocalDateTime expiry = LocalDateTime.now().minusMinutes(5);
        List<OTP> expiredOTPs = otpRepository.findByCreationTimeBefore(expiry);
        if(!expiredOTPs.isEmpty()){
            otpRepository.deleteAll(expiredOTPs);

        }
    }
}
