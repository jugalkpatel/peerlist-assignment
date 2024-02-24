import { faker } from "@faker-js/faker";
import { Candidate, JobApplicationStatus } from "@/types/common.types";

const jobApplicationStatus: JobApplicationStatus[] = [
  "APPLIED",
  "REJECTED",
  "SHORTLISTED",
  "EXTERNAL",
];

function generateRandomValue<T>(options: T[]) {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function generateExperience() {
  const years = faker.number.int({ min: 0, max: 20 });
  const months = faker.number.int({ min: 0, max: 11 });

  let experience = "";

  if (years > 0) {
    experience += `${years}y`;
    if (months > 0) {
      experience += ` `;
    }
  }

  if (months > 0) {
    experience += `${months}m`;
  }

  return experience;
}

export const candidates: Candidate[] = Array(50)
  .fill(1)
  .map((_) => {
    return {
      id: faker.string.uuid(),
      isVerified: faker.datatype.boolean(),
      name: faker.person.fullName(),
      profilePicture: faker.image.avatar(),
      appliedOn: faker.date.past(),
      experience: generateExperience(),
      bio: faker.person.jobTitle(),
      isHoldingOffer: faker.datatype.boolean(),
      noticePeriod: faker.number.int({ min: 1, max: 90 }),
      contact: {
        email: faker.internet.email(),
        phone: faker.phone.number(),
      },
      referredBy: {
        name: faker.person.fullName(),
        profilePicture: faker.image.avatar(),
        id: faker.string.uuid(),
      },
      resume:
        "https://drive.google.com/file/d/1u7sE_YeAy0G7oLO8OJKmGrC4yr1ZgGTF/view",
      jobApplicationProgress: {
        updatedOn: faker.date.past(),
        updatedBy: {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          profilePicture: faker.image.avatar(),
        },
        // status: generateRandomValue(jobApplicationStatus),
        status: "REJECTED",
      },
    };
  });
