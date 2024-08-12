// hooks/useStreamData.ts
import { useMutation, useQuery } from '@tanstack/react-query'
import { firstStreamApi, secondStreamApi } from '../api/streamApi'
import { useStreamValidateVideoById } from '@/lib/react-query/queriesAndMutations'

export const useStreamData = (id: string) => {

  const {
    mutate: useStream,
    isLoading: isLoadingStream,
    isError: isErrorStream,
    error: streamErrorMsg,
  } = useStreamValidateVideoById()


  const startFirstStream = (url: string) => {
    firstStreamQuery.refetch({ queryParams: { url } })
  }

  const startSecondStream = () => {
    useStream(id)
  }

  return {
    firstStreamData: firstStreamQuery.data,
    secondStreamData: secondStreamMutation.data,
    isFirstStreamLoading: firstStreamQuery.isLoading,
    isSecondStreamLoading: secondStreamMutation.isLoading,
    startFirstStream,
    startSecondStream,
  }
}
