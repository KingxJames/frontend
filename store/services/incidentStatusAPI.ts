import { baseAPI } from './baseAPI';

export const incidentStatusAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        fetchIncidentStatuses: builder.query<any[], void>({
            query: () => ({
                url: '/v1/publicSafety/incidentStatuses',
                method: 'GET'
            }),
            transformResponse: (response: { data: any[] }) => response.data
        }),
        fetchIncidentStatusById: builder.query<any, string>({
            query: (id) => ({
                url: `/v1/publicSafety/incidentStatuses/${id}`,
                method: 'GET'
            })
        }),
        createIncidentStatus: builder.mutation<any, Partial<any>>({
            query: (incidentStatus) => ({
                url: '/v1/publicSafety/incidentStatuses',
                method: 'POST',
                body: incidentStatus
            })
        }),
        updateIncidentStatus: builder.mutation<any, { id: string; incidentStatus: Partial<any> }>({
            query: ({ id, incidentStatus }) => ({
                url: `/v1/publicSafety/incidentStatuses/${id}`,
                method: 'PUT',
                body: incidentStatus
            })
        }),
        deleteIncidentStatus: builder.mutation<void, string>({
            query: (id) => ({
                url: `/v1/publicSafety/incidentStatuses/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const {
    useFetchIncidentStatusesQuery,
    useFetchIncidentStatusByIdQuery,
    useCreateIncidentStatusMutation,
    useUpdateIncidentStatusMutation,
    useDeleteIncidentStatusMutation
} = incidentStatusAPI;