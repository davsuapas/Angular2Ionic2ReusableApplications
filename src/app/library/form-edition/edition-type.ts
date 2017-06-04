export enum EicEnumEditionType { add, update }

/**
 * Depending of the type, {@link EicEditionController} will work in add or update mode
 * If the type is update is mandatory set edition id
 */
export interface EicEditionType {
    type: EicEnumEditionType;
    id?: any;
}