// src/services/resumeService.ts
import axiosInstance from "../Intrceptor/AxiosInterceptor";

export const getResume = async (id: number) => {
  return axiosInstance.get(`/applicant/${id}/resume`)
    .then(res => res.data)
   .catch((err)=>{
        console.log(err);
    });
};

export const updateResume = async (applicantDTO: any) => {
  return axiosInstance.put(`/applicant/resume`, applicantDTO)
    .then(res => res.data)
   .catch((err)=>{
        console.log(err);
    });
};

export const createApplicant = async (applicantDTO: any) => {
  return axiosInstance.post(`/applicant/create`, applicantDTO)
    .then(res => res.data)
    .catch((err)=>{
        console.log(err);
    });
};
