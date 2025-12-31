import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Dimension, heightRatio} from '../../utilities/dimensions';
import {colors} from '../../themes';

const deviceWidth = Dimension.width;
const deviceHeight = Dimension.height;

export const ProfileShimmer = props => (
  <ContentLoader
    speed={0.7}
    width={deviceWidth}
    height={161}
    backgroundColor="#EEEEEE"
    foregroundColor="white"
    {...props}>
    <Rect
      x={(deviceWidth - 30) * 0.5 - 44}
      y="20"
      rx="50"
      ry="50"
      width={88}
      height="88"
    />
    <Rect
      x={(deviceWidth - 30) * 0.5 - 68}
      y="120"
      rx="4"
      ry="4"
      width={136}
      height="50"
    />
  </ContentLoader>
);

export const ContentShimmer = props => (
  <ContentLoader
    speed={0.7}
    width={deviceWidth}
    height={deviceHeight}
    backgroundColor="#EEEEEE"
    foregroundColor="white"
    {...props}>
    <Rect x="20" y="30" rx="4" ry="4" />
    {/* <Rect x="90" y="65" rx="2" ry="2" width={100} height="20" />
    <Rect x={deviceWidth - 100} y="40" rx="25" ry="25" width={40} height="40" />
    <Rect x={deviceWidth - 55} y="40" rx="5" ry="5" width={40} height="40" />
    <Rect x="20" y="105" rx="5" ry="5" width={deviceWidth - 40} height="60" /> */}
  </ContentLoader>
);

export const ExerciseShimmer = props => (
  <ContentLoader
    speed={0.7}
    width={deviceWidth}
    height={deviceHeight}
    backgroundColor="#EEEEEE"
    foregroundColor="white"
    {...props}>
    <Rect x={20} y="0" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect x={20} y="85" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect x={20} y="170" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect x={20} y="255" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect x={20} y="340" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect x={20} y="425" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect x={20} y="510" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect x={20} y="595" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect x={20} y="680" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect x={20} y="765" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect x={20} y="850" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect x={20} y="935" rx="10" ry="10" width={deviceWidth - 40} height="69" />
    <Rect
      x={20}
      y="1020"
      rx="10"
      ry="10"
      width={deviceWidth - 40}
      height="69"
    />
  </ContentLoader>
);

export const HomeShimmer = props => (
  <ContentLoader
    speed={0.7}
    width={deviceWidth}
    height={130}
    backgroundColor="#EEEEEE"
    foregroundColor="white"
    {...props}>
    <Rect x={16} y="8" rx="4" ry="4" width={deviceWidth * 0.3} height="27" />
    <Rect x={16} y="48" rx="8" ry="8" width={deviceWidth * 0.078} height="75" />
    <Rect
      x={16 + deviceWidth * 0.048 + deviceWidth * 0.078}
      y="48"
      rx="8"
      ry="8"
      width={deviceWidth * 0.078}
      height="75"
    />
    <Rect
      x={16 + 2 * (deviceWidth * 0.048 + deviceWidth * 0.078)}
      y="48"
      rx="8"
      ry="8"
      width={deviceWidth * 0.078}
      height="75"
    />
    <Rect
      x={16 + 3 * (deviceWidth * 0.048 + deviceWidth * 0.078) + 0.074}
      y="48"
      rx="8"
      ry="8"
      width={deviceWidth * 0.152}
      height="75"
    />
    <Rect
      x={16 + 4 * (deviceWidth * 0.048) + 5 * (deviceWidth * 0.078) + 0.152}
      y="48"
      rx="8"
      ry="8"
      width={deviceWidth * 0.078}
      height="75"
    />
    <Rect
      x={16 + 5 * (deviceWidth * 0.048) + 6 * (deviceWidth * 0.078) + 0.152}
      y="48"
      rx="8"
      ry="8"
      width={deviceWidth * 0.078}
      height="75"
    />
    <Rect
      x={16 + 6 * (deviceWidth * 0.048) + 7 * (deviceWidth * 0.078) + 0.152}
      y="48"
      rx="8"
      ry="8"
      width={deviceWidth * 0.078}
      height="75"
    />
  </ContentLoader>
);

export const RepTrackerShimmer = props => {
  const rowCount = 14; // Adjust to fit within 385px
  const rowHeight = 35;
  const baseX = 16;

  return (
    <ContentLoader
      speed={0.7}
      width={deviceWidth - 32}
      height={410}
      backgroundColor="#EEEEEE"
      foregroundColor="white"
      {...props}>
      {Array.from({length: rowCount}).map((_, index) => {
        const y = index * rowHeight;
        return (
          <React.Fragment key={index}>
            <Rect
              x={baseX}
              y={y}
              rx="4"
              ry="4"
              width={deviceWidth * 0.28}
              height="22"
            />
            <Rect
              x={baseX + deviceWidth * 0.28 + deviceWidth * 0.08}
              y={y}
              rx="4"
              ry="4"
              width={deviceWidth * 0.1}
              height="22"
            />
            <Rect
              x={
                baseX +
                deviceWidth * 0.28 +
                2 * (deviceWidth * 0.08) +
                deviceWidth * 0.1
              }
              y={y}
              rx="4"
              ry="4"
              width={deviceWidth * 0.1}
              height="22"
            />
            <Rect
              x={
                baseX +
                deviceWidth * 0.28 +
                3 * (deviceWidth * 0.08) +
                2 * (deviceWidth * 0.1)
              }
              y={y}
              rx="4"
              ry="4"
              width={deviceWidth * 0.1}
              height="22"
            />
          </React.Fragment>
        );
      })}
    </ContentLoader>
  );
};

export const OverviewMusclesShimmer = props => (
  <ContentLoader
    speed={0.7}
    width={deviceWidth}
    height={40}
    backgroundColor="#EEEEEE"
    foregroundColor="white"
    {...props}>
    <Rect x={0} y="0" rx="4" ry="4" width={deviceWidth - 60} height="33" />
  </ContentLoader>
);
export const OverviewShimmer = props => (
  <ContentLoader
    speed={0.7}
    width={deviceWidth}
    height={100}
    backgroundColor="#EEEEEE"
    foregroundColor="white"
    {...props}>
    <Rect x={0} y="10" rx="4" ry="4" width={deviceWidth * 0.2} height="17" />
    <Rect
      x={deviceWidth * 0.42}
      y="10"
      rx="4"
      ry="4"
      width={deviceWidth * 0.43}
      height="17"
    />

    <Rect x={0} y="32" rx="4" ry="4" width={deviceWidth * 0.05} height="12" />
    <Rect
      x={deviceWidth * 0.42}
      y="32"
      rx="4"
      ry="4"
      width={deviceWidth * 0.05}
      height="12"
    />

    <Rect x={0} y="60" rx="4" ry="4" width={deviceWidth * 0.2} height="17" />
    <Rect
      x={deviceWidth * 0.42}
      y="60"
      rx="4"
      ry="4"
      width={deviceWidth * 0.43}
      height="17"
    />

    <Rect
      x={deviceWidth * 0.42}
      y="82"
      rx="4"
      ry="4"
      width={deviceWidth * 0.05}
      height="12"
    />
    <Rect x={0} y="82" rx="4" ry="4" width={deviceWidth * 0.05} height="12" />
    {/* <Rect
      x={20}
      y="1020"
      rx="10"
      ry="10"
      width={deviceWidth - 40}
      height="69"
    /> */}
  </ContentLoader>
);

// export const ExerciseHighlightShimmer = props => (
//   <ContentLoader
//     speed={0.7}
//     width={deviceWidth}
//     height={160}
//     backgroundColor="#EEEEEE"
//     foregroundColor="white"
//     {...props}>
//     <Rect x={0} y="0" rx="4" ry="4" width="172" height="17" />
//     <Rect x={315} y="0" rx="4" ry="4" width="29" height="17" />

//     <Rect x={0} y="35" rx="4" ry="4" width="172" height="17" />
//     <Rect x={315} y="35" rx="4" ry="4" width="29" height="17" />

//     <Rect x={0} y="70" rx="4" ry="4" width="172" height="17" />
//     <Rect x={315} y="70" rx="4" ry="4" width="29" height="17" />

//     <Rect x={0} y="105" rx="4" ry="4" width="172" height="17" />
//     <Rect x={315} y="105" rx="4" ry="4" width="29" height="17" />

//     <Rect x={0} y="140" rx="4" ry="4" width="172" height="17" />
//     <Rect x={315} y="140" rx="4" ry="4" width="29" height="17" />
//   </ContentLoader>
// );

export const ExerciseHighlightShimmer = props => {
  const rowCount = 5;
  const rowHeight = 30;
  const baseX = 5;

  return (
    <ContentLoader
      speed={0.7}
      width={deviceWidth}
      height={160}
      backgroundColor="#EEEEEE"
      foregroundColor="white"
      {...props}>
      {Array.from({length: rowCount}).map((_, index) => {
        const y = index * rowHeight;
        return (
          <React.Fragment key={index}>
            <Rect
              x={baseX}
              y={y}
              rx="4"
              ry="4"
              width={deviceWidth * 0.5}
              height="17"
            />

            <Rect
              x={
                baseX +
                deviceWidth * 0.28 +
                3 * (deviceWidth * 0.08) +
                2 * (deviceWidth * 0.1) +
                10
              }
              y={y}
              rx="4"
              ry="4"
              width={deviceWidth * 0.1}
              height="17"
            />
          </React.Fragment>
        );
      })}
    </ContentLoader>
  );
};

export const GraphShimmer = props => (
  <ContentLoader
    speed={0.7}
    width={deviceWidth}
    height={220}
    backgroundColor="#EEEEEE"
    foregroundColor="white"
    {...props}>
    <Rect x={0} y="0" rx="4" ry="4" width={deviceWidth - 55} height="212" />
  </ContentLoader>
);

export const FlatListShimmer = props => (
  <ContentLoader
    speed={0.7}
    width={deviceWidth}
    height={deviceHeight}
    backgroundColor="#EEEEEE"
    foregroundColor="white"
    {...props}>
    <Rect x={16} y="0" rx="10" ry="10" width={deviceWidth - 32} height="345" />
    <Rect
      x={16}
      y="361"
      rx="10"
      ry="10"
      width={deviceWidth - 32}
      height="345"
    />
    <Rect
      x={16}
      y="722"
      rx="10"
      ry="10"
      width={deviceWidth - 32}
      height="345"
    />
  </ContentLoader>
);

export const RMExerciseShimmer = props => {
  const rowCount = 7; // Adjust to fit within 385px
  const rowHeight = 35;
  const baseX = 16;

  return (
    <ContentLoader
      speed={0.7}
      width={deviceWidth - 32}
      height={230}
      backgroundColor="#EEEEEE"
      foregroundColor="white"
      {...props}>
      {Array.from({length: rowCount}).map((_, index) => {
        const y = index * rowHeight;
        return (
          <React.Fragment key={index}>
            <Rect
              x={baseX}
              y={y}
              rx="4"
              ry="4"
              width={deviceWidth * 0.28}
              height="17"
            />
            <Rect
              x={baseX + deviceWidth * 0.28 + deviceWidth * 0.06}
              y={y}
              rx="4"
              ry="4"
              width={deviceWidth * 0.12}
              height="17"
            />
            <Rect
              x={
                baseX +
                deviceWidth * 0.28 +
                2 * (deviceWidth * 0.06) +
                deviceWidth * 0.12
              }
              y={y}
              rx="4"
              ry="4"
              width={deviceWidth * 0.12}
              height="17"
            />
            <Rect
              x={
                baseX +
                deviceWidth * 0.28 +
                3 * (deviceWidth * 0.06) +
                2 * (deviceWidth * 0.12)
              }
              y={y}
              rx="4"
              ry="4"
              width={deviceWidth * 0.12}
              height="17"
            />
          </React.Fragment>
        );
      })}
    </ContentLoader>
  );
};

export const BYOShimmer = props => (
  <ContentLoader
    speed={0.7}
    width={deviceWidth}
    height={deviceHeight}
    backgroundColor="#EEEEEE"
    foregroundColor="white"
    {...props}>
    <Rect x={20} y="0" rx="10" ry="10" width={deviceWidth - 40} height="374" />
    <Rect
      x={20}
      y="390"
      rx="10"
      ry="10"
      width={deviceWidth - 40}
      height="374"
    />
  </ContentLoader>
);

export const HiddenExercisesShimmer = props => (
  <ContentLoader
    speed={0.7}
    width={deviceWidth}
    height={160}
    backgroundColor="#EEEEEE"
    foregroundColor="white"
    {...props}>
    <Rect x={0} y="0" rx="4" ry="4" width="172" height="17" />
    <Rect x={315} y="0" rx="4" ry="4" width="20" height="20" />

    <Rect x={0} y="35" rx="4" ry="4" width="162" height="17" />
    <Rect x={315} y="35" rx="4" ry="4" width="20" height="20" />

    <Rect x={0} y="70" rx="4" ry="4" width="198" height="17" />
    <Rect x={315} y="70" rx="4" ry="4" width="20" height="20" />

    <Rect x={0} y="105" rx="4" ry="4" width="172" height="17" />
    <Rect x={315} y="105" rx="4" ry="4" width="20" height="20" />

    <Rect x={0} y="140" rx="4" ry="4" width="179" height="17" />
    <Rect x={315} y="140" rx="4" ry="4" width="20" height="20" />
  </ContentLoader>
);
