// mock for course response
const course = {
  id: '5d841abff874130002bd6236',
  providerCourseId: 'f4c5adfa-22a7-421b-a024-264109077e9c',
  linkedCourses: [],
  providerId: 'f4c5adfa-22a7-421b-a024-264109077e9c',
  providerName: 'ej4',
  globalContentId: 'COPR_EJ4_ej4-db2b1f0e-48dd-4ed1-b911-5bda36c19405',
  trainingType: 'AICC',
  titleEnglishEquivalent: null,
  downloadPackageUrl:
    'http://mockurl.com/061-01-conflict-management-unavoidable-truths.zip',
  isActive: false,
  status: 'Rejected',
  canCreateNewVersion: true,
  canStartReview: true,
  createdDateTime: '2018-07-13T00:14:07.106Z',
  updatedDateTime: '2018-08-10T00:14:07.106Z',
  lastModifiedUtc: '2019-09-20T00:18:07.106Z',
  packageLastModifiedUtc: '2019-09-20T00:18:07.106Z',
  thumbnail: 'http://mockurl.com/db2b1f0e-48dd-4ed1-b911-5bda36c19405.jpg',
  version: '1.0',
  subjects: ['Business Skills'],
  durationSeconds: 345600,
  subtitles: [
    { name: 'Testing Language', code: 'en-TEST' },
    { name: 'English - United States', code: 'en-US' }
  ],
  localization: [
    {
      language: {
        code: 'en-US',
        name: 'English - United States',
        isEnglishUs: true
      },
      title: '01. Conflict Management: Unavoidable Truths',
      description:
        'This is a Conflict Management series. "Managing" conflict means that we acknowledge that conflict exists. It\'s not dwelling on the negativity of that conflict, but rather making conflict a productive thing. It\'s making use of our different opinions and experiences, and growing the individuals, the departments, the products, or whatever, as a result of those differences.',
      keywords: [
        'Professional Productivity',
        'EJ4',
        'Content Anytime Professional Skills'
      ]
    },
    {
      language: {
        code: 'en-TEST',
        name: 'Testing Language',
        isEnglishUs: false
      },
      title: 'Testing Course Title',
      description: 'This is the description for a test language course',
      keywords: ['testing language', 'course']
    }
  ],
  seriesCollection: null,
  isMobile: true,
  curationSubject: 'First Subject',
  curationTopic: 'First Subject - First Topic'
};

const courseSubscriptionsResponse = {
  meta: { pageNumber: 1, pageSize: 25, total: 5, totalPages: 1 },
  data: [
    {
      id: '1d841abef876130002bd5ca7',
      subscriptionGuid: '1d545c3c-6fd5-4026-a718-531a0e2cef12',
      title: 'Extra Content',
      description:
        'Build stronger communicators, strategic thinkers, and higher functioning teams across the organization with soft skills content focused on the business savvy skills that every employee needs.',
      createdDateTime: '2019-09-20T00:18:06.291Z',
      updatedDateTime: '2019-09-20T00:18:06.291Z',
      status: 'Draft',
      createdBy: 'bkimbriel',
      updatedBy: 'bkimbriel'
    },
    {
      id: '2d841abef874r30002bd5ca7',
      subscriptionGuid: '2d545c3c-6fd5-4026-a718-531a0e2cef12',
      title: 'Content Anytime Professional Skills',
      description:
        'Build stronger communicators, strategic thinkers, and higher functioning teams across the organization with soft skills content focused on the business savvy skills that every employee needs.',
      createdDateTime: '2019-09-20T00:18:06.291Z',
      updatedDateTime: '2019-09-20T00:18:06.291Z',
      status: 'Published',
      createdBy: 'bkimbriel',
      updatedBy: 'bkimbriel'
    },
    {
      id: '3d841abef874130002bd5ea7',
      subscriptionGuid: '3d545c3c-6fd5-4026-a718-531a0e2cef12',
      title: 'Hello',
      description:
        'Build stronger communicators, strategic thinkers, and higher functioning teams across the organization with soft skills content focused on the business savvy skills that every employee needs.',
      createdDateTime: '2019-09-20T00:18:06.291Z',
      updatedDateTime: '2019-09-20T00:18:06.291Z',
      status: 'Draft',
      createdBy: 'bkimbriel',
      updatedBy: 'bkimbriel'
    }
  ]
};

// computed course details mock
const CourseDetailsMock = {
  contentType: 'AICC',
  description:
    'This is a Conflict Management series. "Managing" conflict means that we acknowledge that conflict exists. It\'s not dwelling on the negativity of that conflict, but rather making conflict a productive thing. It\'s making use of our different opinions and experiences, and growing the individuals, the departments, the products, or whatever, as a result of those differences.',
  duration: '96 hours',
  gcid: 'COPR_EJ4_ej4-db2b1f0e-48dd-4ed1-b911-5bda36c19405',
  keywords:
    'Professional Productivity, EJ4, Content Anytime Professional Skills',
  createdDateTime: '7/13/18',
  lastModified: '8/10/18',
  metadataLanguage: 'English - United States',
  isMobile: 'Yes',
  provider: 'ej4',
  seriesCollection: 'None',
  subjects: 'Business Skills',
  subscriptions: 'Extra Content, Content Anytime Professional Skills, Hello',
  subtitles: 'Testing Language, English - United States',
  thumbnail: 'http://mockurl.com/db2b1f0e-48dd-4ed1-b911-5bda36c19405.jpg',
  title: '01. Conflict Management: Unavoidable Truths',
  currentLanguage: 'en-US',
  languageOptions: [
    { label: 'English - United States', value: 'en-US' },
    { label: 'Testing Language', value: 'en-TEST' }
  ],
  titleEnglishEquivalent: '',
  difficulty: 'None',
  assignee: 'Unassigned'
};

// course with a single language
const SingleLanguageCourseMock = Object.assign({}, course);
SingleLanguageCourseMock.localization = [
  SingleLanguageCourseMock.localization[0]
];

// exports
export default course;

export {
  courseSubscriptionsResponse,
  CourseDetailsMock,
  SingleLanguageCourseMock
};
