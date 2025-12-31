import {apiManager} from '.';
import {UserProfileData} from '../entities/country';
import {getAuthToken} from '../utilities/asyncStore';
import {APIDataType, apiEndpoints} from './config';

// export const invokeLogoutApi = async () => {
//   const apiData = {
//     method: 'post',
//     endPoint: apiEndpoints.logout,
//     paramsType: 'raw',
//     params: {},
//   };
//   apiManager(apiData)
//     .then((response: any) => {
//       if (response.code === 200) {
//         removeAllKeys();
//       } else {
//         removeAllKeys();
//       }
//     })
//     .catch(reject => {
//       removeAllKeys();
//     });
// };

export type DataApiType = {
  name: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
  weightUnit: string;
  heightUnit: string;
  heightInFeet: string;
  heightInInches: string;
};

export const dataCollectionApi = async ({
  name,
  gender,
  age,
  weight,
  height,
  weightUnit,
  heightUnit,
  heightInFeet,
  heightInInches,
}: DataApiType) => {
  const accessToken = await getAuthToken();
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.dataCollection,
      params: {
        name,
        age,
        gender,
        weight,
        height,
        weightUnit,
        heightUnit,
        heightInFeet,
        heightInInches,
      },
    };
    console.log('API Params:', apiData.params);
    apiManager(apiData)
      .then((response: any) => {
        console.log('resp******', response);
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export const getLogs = async () => {
  const accessToken = await getAuthToken();

  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: apiEndpoints.logs,
      paramsType: 'raw',
      params: {},
    };
    console.log('getLogs API Params:', apiData);
    apiManager(apiData)
      .then((response: any) => {
        console.log('getLogs response:', JSON.stringify(response));
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export type ExerciseLogType = {
  numberOfSets: number;
  numberOfReps: number;
  weight: number;
};

export type LogItemType = {
  exerciseName: string;
  exerciseId: string;
  bodyArea: string;
  startingWeight: number;
  weightUnit: string;
  exerciseLogs: ExerciseLogType[];
};

export type MuscleGroupsType = {
  muscleGroup: any;
  primary: string;
  secondary: string;
  total: string;
};

export type CreateLogType = {
  logItems: LogItemType[];
  muscleGroups: MuscleGroupsType[];
};

export const createLog = async ({logItems, muscleGroups}: CreateLogType) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.logs,
      params: {logItems, muscleGroups},
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export const editProfileApi = async ({
  name,
  gender,
  age,
  weight,
  height,
  weightUnit,
  heightUnit,
  heightInFeet,
  heightInInches,
}: DataApiType) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'patch',
      endPoint: apiEndpoints.editProfile,
      params: {
        name,
        age: age.toString(),
        gender,
        weight: weight.toString(),
        height: height.toString(),
        weightUnit,
        heightUnit,
        heightInFeet: heightInFeet.toString(),
        heightInInches: heightInInches.toString(),
      },
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export const getExercises = async () => {
  const accessToken = await getAuthToken();

  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: apiEndpoints.bodyPart,
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export const fetchUserProfile = async (): Promise<UserProfileData> => {
  return new Promise((resolve, reject) => {
    apiManager({
      endPoint: apiEndpoints.getProfile,
      method: 'GET',
    })
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response.data as UserProfileData); // Explicitly type the response data
        } else {
          reject(response);
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const logoutApiCall = async (refreshToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiManager({
      endPoint: apiEndpoints.logout,
      method: 'post',
      paramsType: 'raw',
      params: {refreshToken},
    })
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const deleteAccountApiCall = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    apiManager({
      endPoint: apiEndpoints.deleteAccount,
      method: 'delete',
    })
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

//delete log
export const deleteLog = async (LogId: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'delete',
      endPoint: apiEndpoints.deleteLog + LogId,
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

//saveWeight

export type WeightType = {
  startingWeight: string;
  rm: string;
  weightUnit: string;
  ifRm: boolean;
  exerciseId: string;
  rm95: string;
  rm90: string;
  trainingMax: string;
};

export const saveWeightApi = async ({
  startingWeight,
  rm,
  weightUnit,
  ifRm,
  exerciseId,
  rm95,
  rm90,
  trainingMax,
}: WeightType) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.createWeight,
      params: {
        startingWeight,
        weightUnit,
        rm,
        ifRm,
        exerciseId,
        rm95,
        rm90,
        trainingMax,
      },
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

//edit log
export const updateLog = async (
  {logItems, muscleGroups}: CreateLogType,
  logId: string,
) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'patch',
      endPoint: apiEndpoints.logs + `/${logId}`,
      params: {logItems, muscleGroups},
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

//mark as complete log
export const markAsCompleteLog = async (logId: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.markAsToday + `/${logId}`,
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

//undo log
export const undoLog = async (logId: string) => {
  const end = apiEndpoints.undoLog + `/${logId}`;
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.undoLog + `/${logId}`,
    };
    apiManager(apiData)
      .then((response: any) => {
        console.log(end, '---end');
        resolve(response);
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

//get single log
export const getLogById = async (logId: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: apiEndpoints.logs + `/${logId}`,
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

//delete log
export const deleteWorkout = async (Id: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'delete',
      endPoint: apiEndpoints.deleteWorkout + Id,
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

type MuscleGroupType = {
  muscleGroup: string;
  primary: string;
  secondary: string;
  total: string;
};

export type CreateWorkoutType = {
  workoutName: string;
  workoutCycle: string;
  weeks: string;
  daysPerWeek: string;
  days: string[];
  exercises: LogItemType[];
  muscleGroups: MuscleGroupType[];
};

export const createWorkoutAPI = async (data: CreateWorkoutType) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.workout,
      params: data,
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export const getOngoingWorkouts = async () => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: apiEndpoints.ongoingWorkout,
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response?.code === 200) {
          resolve(response);
        } else {
          reject(
            new Error(`API Error: ${response?.message || 'Unknown error'}`),
          );
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const getCompletedWorkouts = async () => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: apiEndpoints.completedWorkout,
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response?.code === 200) {
          resolve(response);
        } else {
          reject(
            new Error(`API Error: ${response?.message || 'Unknown error'}`),
          );
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const getRepTrackerData = async (filter: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: apiEndpoints.repTracker + `${filter}`,
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const editWorkout = async (Id: string, workoutData: any) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'patch',
      endPoint: apiEndpoints.workout + '/' + Id,
      params: {
        weeks: workoutData.weeks,
        days: workoutData.days,
        exercises: workoutData.exercises,
        daysPerWeek: workoutData.daysPerWeek,
        workoutName: workoutData.workoutName,
        workoutCycle: workoutData.workoutCycle,
      },
    };

    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export const hideMuscle = async (muscle: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint:
        apiEndpoints.repTrackerHide + `${muscle}` + '&section=rep-tracker',
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export const unhideMuscle = async (muscle: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint:
        apiEndpoints.repTrackerUnHide + `${muscle}` + '&section=rep-tracker',
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export const getLiftTrackerData = async (bodyPart: string, filter: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint:
        apiEndpoints.liftTracker + `${bodyPart}` + '&filter=' + `${filter}`,
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response?.code === 200) {
          resolve(response);
        } else {
          reject(
            new Error(`API Error: ${response?.message || 'Unknown error'}`),
          );
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const liftHideExercise = async (exercise: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint:
        apiEndpoints.liftTrackerHide + `${exercise}` + '&section=lift-tracker',
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export const liftUnHideExercise = async (exercise: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint:
        apiEndpoints.liftTrackerUnHide +
        `${exercise}` +
        '&section=lift-tracker',
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export const getWeightLifted = async (
  bodyName: string,
  exercise: string,
  filter: string,
) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint:
        apiEndpoints.weightLifted +
        `?bodyName=${bodyName}&exercise=${exercise}&filter=${filter}`,
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const setNotification = async (status: boolean) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.toggleNotification + `?notification=${status}`,
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const get1RMOverview = async (exercise: string, filter: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint:
        apiEndpoints.OneRepMaxOverview +
        `${exercise}` +
        '&filter=' +
        `${filter}`,
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const hide1RMExercise = async (exercise: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.hide1RMExercise + `${exercise}` + '&section=1rm',
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const unHide1RMExercise = async (exercise: string) => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'post',
      endPoint: apiEndpoints.unHide1RMExercise + `${exercise}` + '&section=1rm',
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const get1RMExercises = async () => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: apiEndpoints.OneRepMaxExercises,
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const getStatisticsExercises = async () => {
  const accessToken = await getAuthToken();

  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: apiEndpoints.OneRepMaxExercises,
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};

export const closePlanCheckWorkout = async (): Promise<UserProfileData> => {
  return new Promise((resolve, reject) => {
    apiManager({
      endPoint: apiEndpoints.planClose,
      method: 'GET',
    })
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const get1RMExercisesWithRM = async () => {
  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: apiEndpoints.oneRMExerciseWithRM,
    };
    apiManager(apiData)
      .then((response: any) => {
        resolve(response);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const updateToken = async (): Promise<UserProfileData> => {
  return new Promise((resolve, reject) => {
    apiManager({
      endPoint: apiEndpoints.updateToken,
      method: 'post',
    })
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const getNotification = async () => {
  const accessToken = await getAuthToken();

  return new Promise((resolve, reject) => {
    const apiData: APIDataType = {
      method: 'get',
      endPoint: apiEndpoints.notification,
    };
    apiManager(apiData)
      .then((response: any) => {
        if (response.code === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((reject2: any) => {
        reject(reject2);
      });
  });
};
