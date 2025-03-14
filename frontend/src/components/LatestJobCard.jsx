import React from 'react'
import { Badge } from './ui/badge'

function LatestJobCard({companyName,location,title,desciption,positions,jobType,salary}) {
  return (
    <div className='p-4 rounded-lg shadow-lg bg-white cursor-pointer flex flex-col gap-3 items-start border-[1px] border-gray-100 min-h-[250px] justify-center'>
      <div className='py-1'>
        <h1 className='font-bold text-xl'>
          {companyName}
        </h1>
        <p className='text-gray-600 text-sm'>
        {location}
        </p>
      </div>
      <div className='py-2'>
        <h3 className='font-bold text-lg'>
          {title}
        </h3>
        <p className='text-gray-700 text-xs '>
          {desciption}
        </p>
      </div>
      <div className='flex gap-3 items-center'>
        <Badge variant={"outline"} className={'text-blue-700 font-bold'} >
          {positions} Position
        </Badge>
        <Badge variant={"outline"} className={'text-red-700 font-bold'}>
          {jobType}
        </Badge>
        <Badge variant={"outline"} className={'text-purple-900 font-bold'}>
         {Math.round( salary)}LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCard
