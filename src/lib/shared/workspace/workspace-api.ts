import { WorkspacesDetailsResponseModels, WorkspacesListResponseModels } from "../rest-response-models";
import { Prisma, Workspace } from "@prisma/client";
import { api } from "../common/store";

type WorkspaceUpdateInputWithId = Prisma.WorkspaceUpdateInput & {
    url: string;
    emails?: string[];
};

export const workspacesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getWorkspaces: builder.query<WorkspacesListResponseModels, void>({
            query: () => "workspaces",
        }),
        getWorkspace: builder.query<WorkspacesDetailsResponseModels, string>({
            query: (id) => `workspaces/${id}`,
            transformResponse: (response: Workspace) => {
                return { workspace: response } as WorkspacesDetailsResponseModels;
            },
        }),
        createWorkspace: builder.mutation<WorkspacesDetailsResponseModels, Prisma.WorkspaceCreateInput>({
            query: (body) => ({
                url: "workspaces",
                method: "POST",
                body,
            }),
        }),
        updateWorkspace: builder.mutation<WorkspacesDetailsResponseModels, WorkspaceUpdateInputWithId>({
            query: (body) => {
                const { url } = body;

                return {
                    url,
                    method: "PUT",
                    body,
                };
            },
        }),
        deleteWorkspace: builder.mutation<undefined, string>({
            query: (id) => ({
                url: `workspaces/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useGetWorkspacesQuery, useGetWorkspaceQuery, useCreateWorkspaceMutation, useUpdateWorkspaceMutation, useDeleteWorkspaceMutation } = workspacesApi;

export const {
    endpoints: { getWorkspaces, getWorkspace, createWorkspace, updateWorkspace, deleteWorkspace },
} = workspacesApi;
